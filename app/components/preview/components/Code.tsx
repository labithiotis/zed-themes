import { type CSSProperties, type PropsWithChildren, type ReactNode, type UIEvent, useState } from 'react';
import { languagePacks, useLanguage } from '~/providers/language';
import {
  cssVarStyleToken,
  cssVarSyntaxColorToken,
  cssVarSyntaxStyleToken,
  cssVarSyntaxWeightToken,
} from '~/utils/cssVarTokens';
import type { SyntaxTokens } from '../../../providers/tokens';
import { GutterMarkers } from './GutterMarkers';
import { ScrollbarMakers } from './ScrollbarMarkers';

type SNProps = PropsWithChildren<{ s: SyntaxTokens }>;

export const SN = (props: SNProps) => {
  return (
    <span
      data-attribute={`syntax.${props.s}`}
      style={{
        color: cssVarSyntaxColorToken(props.s),
        fontStyle: cssVarSyntaxStyleToken(props.s),
        fontWeight: cssVarSyntaxWeightToken(props.s),
      }}
    >
      {props.children}
    </span>
  );
};

export const Popup = (props: PropsWithChildren<{ style: CSSProperties; content: ReactNode }>) => {
  const [show, setShow] = useState(false);
  return (
    <span className="relative">
      <span onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        {props.children}
      </span>
      {show && (
        <div style={props.style} className="absolute left-0 top-[-36px] text-nowrap rounded border p-1">
          {props.content}
        </div>
      )}
    </span>
  );
};

export const SP = () => <span>&nbsp;</span>;
export const Indent = ({ level }: { level?: number | undefined }) => {
  return (
    <>
      {/* repeat (level * 2) times */}
      {[...Array((level || 1) * 2)].map((a, i) => (
        <SP key={i} />
      ))}
    </>
  );
};
export const LA = () => <SN s="operator">&#60;</SN>;
export const LAF = () => <SN s="operator">&#60;&#47;</SN>;
export const RA = () => <SN s="operator">&#62;</SN>;
export const LB = () => <SN s="punctuation.bracket">&#123;</SN>;
export const RB = () => <SN s="punctuation.bracket">&#125;</SN>;
export const LP = () => <SN s="punctuation.bracket">&#40;</SN>;
export const RP = () => <SN s="punctuation.bracket">&#41;</SN>;
export const LSB = () => <SN s="punctuation.bracket">&#91;</SN>;
export const RSB = () => <SN s="punctuation.bracket">&#93;</SN>;

export function Code() {
  const [top, setTop] = useState(0);

  const { language } = useLanguage();

  const onScroll = (e: UIEvent) => {
    const el = e.target as HTMLDivElement;
    setTop(Math.ceil((el.scrollTop / el.scrollHeight) * el.clientHeight));
  };

  const data = languagePacks[language];

  return (
    <div
      id="editor-code"
      className="flex-1 overflow-hidden"
      style={{
        fontFamily: '"Roboto Mono", "Source Code Pro", monospace',
        '--scrollbar-top': `${top}px`,
        '--scrollbar-thumb-background': cssVarStyleToken('scrollbar_thumb.background'),
        '--scrollbar-thumb-hover-background': cssVarStyleToken('scrollbar.thumb.hover_background'),
        '--scrollbar-thumb-border': cssVarStyleToken('scrollbar.thumb.border'),
        '--scrollbar-track-background': cssVarStyleToken('scrollbar.track.background'),
        '--scrollbar-track-border': cssVarStyleToken('scrollbar.track.border'),
        color: cssVarStyleToken('text', 'white'),
        backgroundColor: cssVarStyleToken('editor.background'),
      }}
    >
      <div
        id="editor-code-scroll"
        className="h-full w-full flex flex-col overflow-y-scroll scrollbar-hide"
        onScroll={onScroll}
      >
        <ScrollbarMakers lineCount={data.lines.length} />
        <div id="scrollbar" />
        {data.lines.map((code, line) => (
          <div
            key={`code-${line.toString()}`}
            className="relative mr-[14px] flex items-start"
            style={{
              backgroundColor: line === data.activeRow ? cssVarStyleToken('editor.active_line.background') : undefined,
            }}
          >
            <div className="git min-w-[6px]">
              <GutterMarkers line={line} />
            </div>
            <div className="gutter min-w-[10px]" />
            <div
              className="line-number min-w-[25px] text-right"
              style={{
                color: cssVarStyleToken(line === data.activeRow ? 'editor.active_line_number' : 'editor.line_number'),
              }}
            >
              {line <= data.lines.length ? line + 1 : ''}
            </div>
            <div className="code flex flex-1 pl-2">{code}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

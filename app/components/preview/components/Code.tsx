import { CSSProperties, PropsWithChildren, ReactNode, UIEvent, useState } from 'react';
import {
  cssVarStyleToken,
  cssVarSyntaxColorToken,
  cssVarSyntaxStyleToken,
  cssVarSyntaxWeightToken,
} from '~/utils/cssVarTokens';
import { SyntaxTokens } from '../../../providers/tokens';
import { GutterMarkers } from './GutterMarkers';
import { ScrollbarMakers } from './ScrollbarMarkers';

const EXTRA_LINES = 10;

type SNProps = PropsWithChildren<{ s: SyntaxTokens }>;

const SN = (props: SNProps) => {
  return (
    <span
      data-attribute={'syntax.' + props.s}
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

const Popup = (props: PropsWithChildren<{ style: CSSProperties; content: ReactNode }>) => {
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

const SP = () => <span>&nbsp;</span>;
const Indent = () => (
  <>
    <SP />
    <SP />
  </>
);
const LA = () => <SN s="keyword">&#60;</SN>;
const LAF = () => <SN s="keyword">&#60;&#47;</SN>;
const RA = () => <SN s="keyword">&#62;</SN>;
const LB = () => <SN s="punctuation.bracket">&#123;</SN>;
const RB = () => <SN s="punctuation.bracket">&#125;</SN>;
const LP = () => <SN s="punctuation.bracket">&#40;</SN>;
const RP = () => <SN s="punctuation.bracket">&#41;</SN>;

const ACTIVE_ROW = 10;

const lines = [
  <div key="line1">
    <span
      style={{
        textDecorationLine: 'underline',
        textDecorationStyle: 'wavy',
        textDecorationColor: cssVarStyleToken('error'),
      }}
    >
      <SN s="keyword">import</SN>
      <SP />
      <SN s="variable">fs</SN>
      <SP />
      <SN s="keyword">from</SN>
      <SP />
      <SN s="string">&#34;fs&#34;</SN>
      <SN s="punctuation.delimiter">;</SN>
    </span>
    <br />
    <span
      style={{
        color: cssVarStyleToken('error'),
      }}
    >
      &#39;fs&#39; is declared but its value is never read.
    </span>
  </div>,
  <SN key="line2" s="comment">
    &#47;&#47; simple comment
  </SN>,
  <SN key="line3" s="comment.doc">
    &#47;** @param &#123;string&#125; a block comment **&#47;
  </SN>,
  <span key="line4">
    <SN s="keyword">type</SN>
    <SP />
    <SN s="type">Prop</SN>
    <SP />
    <SN s="operator">=</SN>
    <SP />
    <LB />
    <SP />
    <SN s="property">a</SN>
    <SN s="punctuation.delimiter">;</SN>
    <SP />
    <SN s="type">boolean</SN>
    <SN s="punctuation.delimiter">;</SN>
    <SP />
    <SN s="property">b</SN>
    <SN s="punctuation.delimiter">:</SN>
    <SP />
    <SN s="constant">null</SN>
    <SN s="punctuation.delimiter">;</SN>
    <SP />
    <SN s="property">c</SN>
    <SN s="punctuation.delimiter">:</SN>
    <SP />
    <SN s="type">string</SN>
    <SP />
    <RB />
    <SN s="punctuation.delimiter">;</SN>
  </span>,
  <span key="line5">
    <SN s="keyword">enum</SN>
    <SP />
    <SN s="type">
      <Popup
        style={{
          color: cssVarStyleToken('error'),
          backgroundColor: cssVarStyleToken('error.background'),
          borderColor: cssVarStyleToken('error.border'),
        }}
        content="'Enum' is declared but never used."
      >
        <span
          style={{
            textDecorationLine: 'underline',
            textDecorationStyle: 'wavy',
            textDecorationColor: cssVarStyleToken('error'),
          }}
        >
          Enum
        </span>
      </Popup>
    </SN>
    <SP />
    <LB />
    <SP />
    <SN s="property">zed</SN>
    <SP />
    <SN s="operator">=</SN>
    <SP />
    <SN s="string">&#39;zed&#39;</SN>
    <SP />
    <RB />
  </span>,
  <span key="line6">
    <SN s="keyword">const</SN>
    <SP />
    <SN s="variable">number</SN>
    <SP />
    <SN s="operator">=</SN>
    <SP />
    <SN s="number">1</SN>
    <SN s="punctuation.delimiter">;</SN>
  </span>,
  <span key="line7">
    <SN s="keyword">const</SN>
    <SP />
    <SN s="variable">string</SN>
    <SP />
    <SN s="operator">=</SN>
    <SP />
    <Popup
      style={{
        color: cssVarStyleToken('warning'),
        backgroundColor: cssVarStyleToken('warning.background'),
        borderColor: cssVarStyleToken('warning.border'),
      }}
      content={'Typo in the word "strig"'}
    >
      <span
        style={{
          textDecorationLine: 'underline',
          textDecorationStyle: 'wavy',
          textDecorationColor: cssVarStyleToken('warning'),
        }}
      >
        <SN s="string">&#34;strig&#34;</SN>
      </span>
    </Popup>

    <SN s="punctuation.delimiter">;</SN>
  </span>,
  <span key="line8">
    <SN s="keyword">const</SN>
    <SP />
    <SN s="variable">boolean</SN>
    <SP />
    <SN s="operator">=</SN>
    <SP />
    <SN s="boolean">true</SN>
    <SN s="punctuation.delimiter">;</SN>
  </span>,
  <span key="line9">
    <SN s="keyword">const</SN>
    <SP />
    <SN s="variable">object</SN>
    <SP />
    <SN s="operator">=</SN>
    <SP />
    <LB />
    <SP />
    <SN s="property">id</SN>
    <SN s="punctuation.delimiter">:</SN>
    <SP />
    <SN s="string">`</SN>
    <SN s="punctuation.special">$&#123;</SN>
    <SN s="variable">string</SN>
    <SN s="punctuation.special">&#125;</SN>
    <SN s="string">_id1`</SN>
    <SP />
    <RB />
    <SP />
    <SN s="punctuation.delimiter">;</SN>
  </span>,
  <span key="line10">
    <SN s="keyword">const</SN>
    <SP />
    <SN s="variable">regex</SN>
    <SP />
    <SN s="operator">=</SN>
    <SP />
    <SN s="operator">/</SN>
    <SN s="string.regex">(L^\d]string).*</SN>
    <SN s="operator">/</SN>
    <SN s="string.regex">i</SN>
    <SN s="punctuation.delimiter">;</SN>
  </span>,
  <span key="line11" className="flex">
    <SN s="keyword">export</SN>
    <SP />
    <SN s="keyword">default</SN>
    <SP />
    <SN s="keyword">function</SN>
    <SP />
    <SN s="type">App</SN>
    <SN s="keyword">
      <LA />
    </SN>
    <SN s="type">T</SN>
    <SP />
    <SN s="keyword">extends</SN>
    <SP />
    <SN s="type">Prop</SN>
    <SP />
    <SN s="operator">=</SN>
    <SP />
    <SN s="type">object</SN>
    <SN s="keyword">
      <RA />
    </SN>
    <LP />
    <SN s="variable">p</SN>
    <SN s="punctuation.delimiter">:</SN>
    <SP />
    <SN s="type">T</SN>
    <RP />
    <SN s="punctuation.delimiter">:</SN>
    <SP />
    <SN s="type">any</SN>
    <SP />
    <LB />
    <SP />
    <span
      className="blink h-full"
      style={{
        backgroundColor: cssVarStyleToken('text.accent'),
        width: '2px',
      }}
    />
  </span>,
  <span key="line12">
    <Indent />
    <SN s="keyword">if</SN>
    <SP />
    <LP />
    <SN s="variable">p</SN>
    <SP />
    <SN s="operator">==</SN>
    <SP />
    <SN s="boolean">true</SN>
    <RP />
    <SP />
    <SN s="keyword">return</SN>
    <SP />
    <SN s="constant">null</SN>
    <SN s="punctuation.delimiter">;</SN>
  </span>,
  <span key="line13">
    <Indent />
    <SN s="keyword">return</SN>
    <SP />
    <LP />
  </span>,
  <span key="line14">
    <Indent />
    <Indent />
    <LA />
    <SN s="tag">div</SN>
    <SP />
    <SN s="attribute">className</SN>
    <SN s="keyword">=</SN>
    <SN s="string">&#34;class1&#34;</SN>
    <SP />
    <SN s="attribute">style</SN>
    <SN s="keyword">=</SN>
    <LB />
    <LB />
    <SP />
    <SN s="property">test</SN>
    <SN s="punctuation.delimiter">:</SN>
    <SP />
    <SN s="number">1</SN>
    <SP />
    <RB />
    <RB />
    <RA />
  </span>,
  <span key="line15">
    <Indent />
    <Indent />
    <Indent />
    hello world
    <SP />
    <LB />
    <SN s="variable">p</SN>
    <SN s="punctuation.delimiter">.</SN>
    <SN s="property">name</SN>
    <RB />!
  </span>,
  <span key="line16">
    <Indent />
    <Indent />
    <LAF />
    <SN s="tag">div</SN>
    <RA />
  </span>,
  <span key="line17">
    <Indent />
    <RP />
  </span>,
  <span key="line18">
    <RB />
    <SN s="punctuation.delimiter">;</SN>
  </span>,
  <span key="line19">
    <SN s="keyword">class</SN>
    <SP />
    <SN s="type">
      <Popup
        style={{
          color: cssVarStyleToken('error'),
          backgroundColor: cssVarStyleToken('error.background'),
          borderColor: cssVarStyleToken('error.border'),
        }}
        content="'Test' is declared but never used."
      >
        <span
          style={{
            textDecorationLine: 'underline',
            textDecorationStyle: 'wavy',
            textDecorationColor: cssVarStyleToken('error'),
          }}
        >
          Test
        </span>
      </Popup>
    </SN>
    <SP />
    <LB />
  </span>,
  <span key="line20">
    <Indent />
    <SN s="keyword">private</SN>
    <SP />
    <SN s="keyword">readonly</SN>
    <SP />
    <SN s="variable">name</SN>
    <SN s="punctuation.delimiter">:</SN>
    <SP />
    <SN s="type">string</SN>
    <SN s="punctuation.delimiter">;</SN>
  </span>,
  <span key="line21">
    <Indent />
    <SN s="function.method">constructor</SN>
    <LP />
    <SN s="variable">name</SN>
    <SN s="punctuation.delimiter">:</SN>
    <SP />
    <SN s="type">string</SN>
    <RP />
    <SP />
    <SN s="type">void</SN>
    <SP />
    <LB />
  </span>,
  <span key="line22">
    <Indent />
    <Indent />
    <SN s="variable.special">this</SN>
    <SN s="punctuation.delimiter">.</SN>
    <SN s="variable">name</SN>
    <SN s="punctuation.delimiter">;</SN>
  </span>,
  <span key="line23">
    <Indent />
    <RB />
  </span>,
  '',
  <span key="line24">
    <Indent />
    <SN s="constructor">@guard</SN>
    <LP />
    <LB />
    <SP />
    <SN s="property">description</SN>
    <SN s="punctuation.delimiter">:</SN>
    <SP />
    <SN s="string">&#39;Gets name&#39;</SN>
    <SP />
    <RB />
    <RP />
  </span>,
  <span key="line25">
    <Indent />
    <SN s="keyword">public</SN>
    <SP />
    <SN s="function.method">getName</SN>
    <LP />
    <RP />
    <SP />
    <LB />
  </span>,
  <span key="line26">
    <Indent />
    <Indent />
    <SN s="keyword">return</SN>
    <SP />
    <SN s="variable.special">this</SN>
    <SN s="punctuation.delimiter">.</SN>
    <SN s="variable">name</SN>
    <SN s="punctuation.delimiter">;</SN>
  </span>,
  <span key="line27">
    <Indent />
    <RB />
  </span>,
  <span key="line28">
    <RB />
  </span>,
  '',
];

export function Code() {
  const [top, setTop] = useState(0);

  const onScroll = (e: UIEvent) => {
    const el = e.target as HTMLDivElement;
    setTop(Math.ceil((el.scrollTop / el.scrollHeight) * el.clientHeight));
  };

  return (
    <code
      id="editor-code"
      className="flex overflow-hidden"
      style={{
        fontFamily: '"Roboto Mono", "Source Code Pro", monospace',
        '--scrollbar-top': top + 'px',
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
        className="flex flex-1 flex-col overflow-y-scroll scrollbar-hide"
        onScroll={onScroll}
      >
        <ScrollbarMakers lineCount={lines.length + EXTRA_LINES} />
        <div id="scrollbar" />
        {lines.map((code, line) => (
          <div
            key={`code-${line}`}
            className="relative mr-[14px] flex items-start"
            style={{
              backgroundColor: line === ACTIVE_ROW ? cssVarStyleToken('editor.active_line.background') : undefined,
            }}
          >
            <div className="git min-w-[6px]">
              <GutterMarkers line={line} />
            </div>
            <div className="gutter min-w-[10px]"></div>
            <div
              className="line-number min-w-[25px] text-right"
              style={{
                color: cssVarStyleToken(line === ACTIVE_ROW ? 'editor.active_line_number' : 'editor.line_number'),
              }}
            >
              {line <= lines.length ? line + 1 : ''}
            </div>
            <div className="code flex flex-1 pl-2">{code}</div>
          </div>
        ))}
        {new Array(EXTRA_LINES).fill(1).map((_, i) => (
          <div key={`blank-${i}`}>&nbsp;</div>
        ))}
      </div>
    </code>
  );
}

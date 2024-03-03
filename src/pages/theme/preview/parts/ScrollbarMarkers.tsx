import { useSignal } from '@preact/signals';
import { useLayoutEffect } from 'preact/hooks';
import { cssVarStyleToken } from '~/utils/cssVarTokens';
import { GIT_CREATED, GIT_DELETED, GIT_MODIFIED } from './GutterMarkers';

export function ScrollbarMakers({ lineCount }: { lineCount: number }) {
  const scrollbarDiffHeight = useSignal('16px');

  useLayoutEffect(() => {
    const el = document.getElementById('editor-code-scroll');
    if (el) {
      const height = el.clientHeight / lineCount;
      scrollbarDiffHeight.value = height + 'px';
    }
  }, []);

  return (
    <>
      <ScrollbarDiffs
        height={scrollbarDiffHeight.value}
        lineCount={lineCount}
      />
      <ScrollbarInfo height={scrollbarDiffHeight.value} lineCount={lineCount} />
    </>
  );
}

function ScrollbarDiffs({
  height,
  lineCount,
}: {
  height: string;
  lineCount: number;
}) {
  return (
    <div class="z-2 absolute bottom-0 right-0 top-0">
      {new Array(lineCount).fill(1).map((_, line) => (
        <ScrollbarDiffLine height={height} line={line} />
      ))}
    </div>
  );
}

function ScrollbarDiffLine({ height, line }: { height: string; line: number }) {
  let backgroundColor;
  if (GIT_CREATED.includes(line)) {
    backgroundColor = cssVarStyleToken('created');
  } else if (GIT_MODIFIED.includes(line)) {
    backgroundColor = cssVarStyleToken('modified');
  } else if (GIT_DELETED.includes(line)) {
    backgroundColor = cssVarStyleToken('deleted');
  }

  return (
    <div class="block w-[10px]" style={{ height, backgroundColor }}>
      &nbsp;
    </div>
  );
}

const INFO_ERROR = [0, 4, 18];
const INFO_INFO = [2, 15];

function ScrollbarInfo({
  height,
  lineCount,
}: {
  height: string;
  lineCount: number;
}) {
  return (
    <div class="z-2 absolute bottom-0 right-0 top-0">
      {new Array(lineCount).fill(1).map((_, line) => (
        <ScrollbarInfoLine height={height} line={line} />
      ))}
    </div>
  );
}

function ScrollbarInfoLine({ height, line }: { height: string; line: number }) {
  let backgroundColor;
  if (INFO_ERROR.includes(line)) {
    backgroundColor = cssVarStyleToken('error');
  } else if (INFO_INFO.includes(line)) {
    backgroundColor = cssVarStyleToken('info');
  }

  return (
    <div class="flex w-[10px] items-center" style={{ height }}>
      <div class="h-[1px]" style={{ backgroundColor }}>
        &nbsp;
      </div>
    </div>
  );
}

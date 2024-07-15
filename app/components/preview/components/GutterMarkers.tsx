import type { CSSProperties } from 'react';
import { cssVarStyleToken } from '~/utils/cssVarTokens';

export const GIT_CREATED = [4, 5, 6];
export const GIT_DELETED = [10];
export const GIT_MODIFIED = [2, 12, 13, 14, 15];

export function GutterMarkers({ line }: { line: number }) {
  let backgroundColor: CSSProperties['backgroundColor'];
  if (GIT_CREATED.includes(line)) {
    backgroundColor = cssVarStyleToken('created');
  } else if (GIT_MODIFIED.includes(line)) {
    backgroundColor = cssVarStyleToken('modified');
  } else if (GIT_DELETED.includes(line)) {
    backgroundColor = cssVarStyleToken('deleted');
  }

  return (
    <div className="block h-full w-[6px]" style={{ backgroundColor }}>
      &nbsp;
    </div>
  );
}

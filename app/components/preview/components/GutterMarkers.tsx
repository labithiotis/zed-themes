import type { CSSProperties } from 'react';
import { cssVarStyleToken } from '~/utils/cssVarTokens';

export const GIT_CREATED = [4, 5, 6];
export const GIT_DELETED = [10];
export const GIT_MODIFIED = [2, 12, 13, 14, 15];

export function GutterMarkers({ line }: { line: number }) {
  let backgroundColor: CSSProperties['backgroundColor'];
  let dataToken: string | undefined;

  if (GIT_CREATED.includes(line)) {
    backgroundColor = cssVarStyleToken('created');
    dataToken = 'style.created';
  } else if (GIT_MODIFIED.includes(line)) {
    backgroundColor = cssVarStyleToken('modified');
    dataToken = 'style.modified';
  } else if (GIT_DELETED.includes(line)) {
    backgroundColor = cssVarStyleToken('deleted');
    dataToken = 'style.deleted';
  }

  return (
    <div className="block h-full w-[6px]" data-token={dataToken} style={{ backgroundColor }}>
      &nbsp;
    </div>
  );
}

import { CSSProperties, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  hidden?: boolean;
  style?: CSSProperties;
}>;

export function GhostButton({ hidden, ...props }: Props) {
  return <span className={'ghost-button' + (hidden ? ' ghost-button-hidden' : '')} {...props} />;
}

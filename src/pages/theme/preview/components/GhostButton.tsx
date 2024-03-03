import { CSSProperties, PropsWithChildren } from 'preact/compat';

type Props = PropsWithChildren<{
  hidden?: boolean;
  style?: CSSProperties;
}>;

export function GhostButton({ hidden, ...props }: Props) {
  return (
    <span
      class={'ghost-button' + (hidden ? ' ghost-button-hidden' : '')}
      {...props}
    />
  );
}

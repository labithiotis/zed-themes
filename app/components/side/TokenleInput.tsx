import type { MouseEventHandler } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { cn } from '~/utils';

interface TokenleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: MouseEventHandler<HTMLButtonElement>;
}

export default function TokenleInput({ onClear, ...props }: TokenleInputProps) {
  return (
    <div className="group/token-input relative w-full">
      <input {...props} className={cn('pr-10 w-full peer', props.className)} />
      {!props.disabled && !!props.value && (
        <button
          type="button"
          className="hidden group-hover/token-input:block opaccity-80 peer-focus:opaccity-100 absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
          onClick={onClear}
        >
          <IoIosCloseCircleOutline />
        </button>
      )}
    </div>
  );
}

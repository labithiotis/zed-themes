import type { ComponentProps, ReactNode } from 'react';
import { RxChevronDown } from 'react-icons/rx';
import { cn } from '~/utils';
import type { ButtonProps } from './button';
import { Button } from './button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './dropdown-menu';

export interface ButtonMenuProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonProps {
  label: ReactNode;
  children: ComponentProps<typeof DropdownMenuContent>['children'];
}

export const ButtonMenu = ({ children, label, ...props }: ButtonMenuProps) => {
  return (
    <div className="flex -space-x-px">
      <Button {...props} className={cn(props.className, 'rounded-r-none')} asChild>
        {label}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button {...props} className={'rounded-l-none border-l-0 px-2'} aria-label="more-options">
            <RxChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>{children}</DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

ButtonMenu.displayName = 'ButtonMenu';

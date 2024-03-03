import ArrowLeftIcon from '~/assets/icons/arrow_left.svg?react';
import ArrowRightIcon from '~/assets/icons/arrow_right.svg?react';
import MaximizeIcon from '~/assets/icons/maximize.svg?react';
import PlusIcon from '~/assets/icons/plus.svg?react';
import SplitIcon from '~/assets/icons/split.svg?react';
import XIcon from '~/assets/icons/x.svg?react';
import { cssVarStyleToken } from '~/utils/cssVarTokens.ts';
import { GhostButton } from '../components/GhostButton.tsx';

export function Tabs() {
  return (
    <div
      id="editor-tabs"
      class="flex"
      style={{
        backgroundColor: cssVarStyleToken('tab_bar.background'),
      }}
    >
      <div
        class="flex items-center border-b p-1"
        style={{
          borderColor: cssVarStyleToken('border'),
        }}
      >
        <GhostButton>
          <div class="p-1" style={{ color: cssVarStyleToken('icon.muted') }}>
            <ArrowLeftIcon width={14} height={14} />
          </div>
        </GhostButton>
        <GhostButton>
          <div class="p-1" style={{ color: cssVarStyleToken('icon.disabled') }}>
            <ArrowRightIcon width={14} height={14} />
          </div>
        </GhostButton>
      </div>
      <div class="flex flex-1 items-center">
        <div
          class="flex h-full items-center gap-1 border-l pl-6 pr-1"
          style={{
            color: cssVarStyleToken('text'),
            borderColor: cssVarStyleToken('border'),
            backgroundColor: cssVarStyleToken('tab.active_background'),
          }}
        >
          <span>App.tsx</span>
          <span
            class="text-xs"
            style={{ color: cssVarStyleToken('text.muted') }}
          >
            ~/src
          </span>
          <GhostButton hidden={true}>
            <XIcon
              width={12}
              height={12}
              style={{ color: cssVarStyleToken('text.muted') }}
            />
          </GhostButton>
        </div>
        <div
          class="flex h-full items-center gap-1 border-b border-l pl-6 pr-1"
          style={{
            color: cssVarStyleToken('text.muted'),
            borderColor: cssVarStyleToken('border'),
            backgroundColor: cssVarStyleToken('tab.inactive_background'),
          }}
        >
          <span>index.html</span>
          <GhostButton hidden={true}>
            <XIcon
              width={12}
              height={12}
              style={{ color: cssVarStyleToken('text.muted') }}
            />
          </GhostButton>
        </div>
        <div
          class="flex h-full items-center gap-1 border-b border-l pl-6 pr-1"
          style={{
            color: cssVarStyleToken('text.muted'),
            borderColor: cssVarStyleToken('border'),
            backgroundColor: cssVarStyleToken('tab.inactive_background'),
          }}
        >
          <span>package.json</span>
          <GhostButton hidden={true}>
            <XIcon
              width={12}
              height={12}
              style={{ color: cssVarStyleToken('text.muted') }}
            />
          </GhostButton>
        </div>
        <div
          class="h-full w-full flex-1 border-b border-l"
          style={{
            borderColor: cssVarStyleToken('border'),
          }}
        />
      </div>
      <div
        class="flex items-center gap-2 border-b border-l px-2"
        style={{
          borderColor: cssVarStyleToken('border'),
        }}
      >
        <GhostButton>
          <div class="p-1" style={{ color: cssVarStyleToken('icon.muted') }}>
            <PlusIcon width={14} height={14} />
          </div>
        </GhostButton>
        <GhostButton>
          <div class="p-1" style={{ color: cssVarStyleToken('icon.muted') }}>
            <SplitIcon width={14} height={14} />
          </div>
        </GhostButton>
        <GhostButton>
          <div class="p-1" style={{ color: cssVarStyleToken('icon.muted') }}>
            <MaximizeIcon width={14} height={14} />
          </div>
        </GhostButton>
      </div>
    </div>
  );
}

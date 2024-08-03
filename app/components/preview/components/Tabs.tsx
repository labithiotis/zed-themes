import ArrowLeftIcon from '~/assets/icons/arrow_left.svg?react';
import ArrowRightIcon from '~/assets/icons/arrow_right.svg?react';
import MaximizeIcon from '~/assets/icons/maximize.svg?react';
import PlusIcon from '~/assets/icons/plus.svg?react';
import SplitIcon from '~/assets/icons/split.svg?react';
import XIcon from '~/assets/icons/x.svg?react';
import { languagePacks, useLanguage } from '~/providers/language';
import { cssVarStyleToken } from '~/utils/cssVarTokens';
import { GhostButton } from './GhostButton';

export function Tabs() {
  const { language } = useLanguage();

  const tabs = languagePacks[language].tabs;

  return (
    <div
      id="editor-tabs"
      className="flex"
      style={{
        backgroundColor: cssVarStyleToken('tab_bar.background'),
      }}
    >
      <div
        className="flex items-center border-b p-1"
        style={{
          borderColor: cssVarStyleToken('border'),
        }}
      >
        <GhostButton>
          <div className="p-1" style={{ color: cssVarStyleToken('icon.muted') }}>
            <ArrowLeftIcon width={14} height={14} />
          </div>
        </GhostButton>
        <GhostButton>
          <div className="p-1" style={{ color: cssVarStyleToken('icon.disabled') }}>
            <ArrowRightIcon width={14} height={14} />
          </div>
        </GhostButton>
      </div>
      <div className="flex flex-1 items-center">
        <div
          className="flex h-full items-center gap-1 border-l pl-6 pr-1"
          style={{
            color: cssVarStyleToken('text'),
            borderColor: cssVarStyleToken('border'),
            backgroundColor: cssVarStyleToken('tab.active_background'),
          }}
        >
          <span>{tabs[0]}</span>
          <span className="text-xs" style={{ color: cssVarStyleToken('text.muted') }}>
            ~/src
          </span>
          <GhostButton hidden={true}>
            <XIcon width={12} height={12} style={{ color: cssVarStyleToken('text.muted') }} />
          </GhostButton>
        </div>
        <div
          className="flex h-full items-center gap-1 border-b border-l pl-6 pr-1"
          style={{
            color: cssVarStyleToken('text.muted'),
            borderColor: cssVarStyleToken('border'),
            backgroundColor: cssVarStyleToken('tab.inactive_background'),
          }}
        >
          <span>{tabs[1]}</span>
          <GhostButton hidden={true}>
            <XIcon width={12} height={12} style={{ color: cssVarStyleToken('text.muted') }} />
          </GhostButton>
        </div>
        <div
          className="flex h-full items-center gap-1 border-b border-l pl-6 pr-1"
          style={{
            color: cssVarStyleToken('text.muted'),
            borderColor: cssVarStyleToken('border'),
            backgroundColor: cssVarStyleToken('tab.inactive_background'),
          }}
        >
          <span>{tabs[2]}</span>
          <GhostButton hidden={true}>
            <XIcon width={12} height={12} style={{ color: cssVarStyleToken('text.muted') }} />
          </GhostButton>
        </div>
        <div
          className="h-full w-full flex-1 border-b border-l"
          style={{
            borderColor: cssVarStyleToken('border'),
          }}
        />
      </div>
      <div
        className="flex items-center gap-2 border-b border-l px-2"
        style={{
          borderColor: cssVarStyleToken('border'),
        }}
      >
        <GhostButton>
          <div className="p-1" style={{ color: cssVarStyleToken('icon.muted') }}>
            <PlusIcon width={14} height={14} />
          </div>
        </GhostButton>
        <GhostButton>
          <div className="p-1" style={{ color: cssVarStyleToken('icon.muted') }}>
            <SplitIcon width={14} height={14} />
          </div>
        </GhostButton>
        <GhostButton>
          <div className="p-1" style={{ color: cssVarStyleToken('icon.muted') }}>
            <MaximizeIcon width={14} height={14} />
          </div>
        </GhostButton>
      </div>
    </div>
  );
}

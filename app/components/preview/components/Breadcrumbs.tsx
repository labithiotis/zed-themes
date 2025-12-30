import CaseInsensitiveIcon from '~/assets/icons/case_insensitive.svg?react';
import ChevronLeftIcon from '~/assets/icons/chevron_left.svg?react';
import ChevronRightIcon from '~/assets/icons/chevron_right.svg?react';
import InlayHintIcon from '~/assets/icons/inlay_hint.svg?react';
import MagicWandIcon from '~/assets/icons/magic_wand.svg?react';
import MagnifyingGlassIcon from '~/assets/icons/magnifying_glass.svg?react';
import ReplaceIcon from '~/assets/icons/replace.svg?react';
import SelectAllIcon from '~/assets/icons/select_all.svg?react';
import WordSearchIcon from '~/assets/icons/word_search.svg?react';
import { languagePacks, useLanguage } from '~/providers/language';
import { cssVarStyleToken } from '~/utils/cssVarTokens';
import { GhostButton } from './GhostButton';

export function Breadcrumbs() {
  const language = useLanguage((s) => s.language);

  const Breadcrumbs = languagePacks[language ?? 'tsx'].breadcrumbs;

  return (
    <div
      className="flex flex-col border-b"
      data-token="style.toolbar.background"
      style={{
        borderColor: cssVarStyleToken('border.variant'),
        backgroundColor: cssVarStyleToken('toolbar.background'),
      }}
    >
      <div id="editor-breadcrums" className="flex px-2 py-1">
        <div className="ml-1 flex flex-1 items-center">
          <GhostButton style={{ paddingInline: '4px' }}>
            <div className="flex items-center gap-2">{Breadcrumbs}</div>
          </GhostButton>
        </div>
        <div className="flex items-center gap-2">
          <GhostButton>
            <div className="p-1" data-token="style.text" style={{ color: cssVarStyleToken('text') }}>
              <InlayHintIcon width={14} height={14} />
            </div>
          </GhostButton>
          <GhostButton>
            <div className="p-1" data-token="style.text.accent" style={{ color: cssVarStyleToken('text.accent') }}>
              <MagnifyingGlassIcon width={14} height={14} />
            </div>
          </GhostButton>
          <GhostButton>
            <div className="p-1" data-token="style.text" style={{ color: cssVarStyleToken('text') }}>
              <MagicWandIcon width={14} height={14} />
            </div>
          </GhostButton>
        </div>
      </div>
      <div id="editor-search" className="flex justify-between pb-2 pl-2 pr-1 pt-1">
        <div className="flex flex-1 items-center gap-2">
          <div
            className="flex items-center gap-2 rounded-lg border px-2 py-1"
            data-token="style.border"
            style={{ borderColor: cssVarStyleToken('border') }}
          >
            <span data-token="style.text">
              <MagnifyingGlassIcon style={{ color: cssVarStyleToken('text') }} />
            </span>
            <input
              className="placeholder-color bg-transparent text-sm outline-none"
              placeholder="Search (↑/↓ for previous/next query)"
              style={{
                '--placeholder-color': cssVarStyleToken('text.muted'),
                color: cssVarStyleToken('text'),
              }}
              data-token="style.text"
            />
            <GhostButton>
              <div className="p-1" data-token="style.text" style={{ color: cssVarStyleToken('text') }}>
                <CaseInsensitiveIcon width={14} height={14} />
              </div>
            </GhostButton>
            <GhostButton>
              <div className="p-1" data-token="style.text" style={{ color: cssVarStyleToken('text') }}>
                <WordSearchIcon width={14} height={14} />
              </div>
            </GhostButton>
          </div>
          <div
            className="border-md flex h-full items-stretch overflow-hidden rounded-lg"
            data-token="style.element.background"
            style={{
              backgroundColor: cssVarStyleToken('element.background'),
              '--bg-color': cssVarStyleToken('element.background'),
              '--bg-hover': cssVarStyleToken('element.hover'),
            }}
          >
            <span
              className="bg-hover text-md flex cursor-pointer items-center px-2"
              data-token="style.text.accent"
              style={{ color: cssVarStyleToken('text.accent') }}
            >
              Text
            </span>
            <span
              className="bg-hover text-md flex cursor-pointer items-center px-2"
              data-token="style.text"
              style={{ color: cssVarStyleToken('text') }}
            >
              Regex
            </span>
          </div>
          <GhostButton>
            <div className="p-1" data-token="style.text" style={{ color: cssVarStyleToken('text') }}>
              <ReplaceIcon width={16} height={16} />
            </div>
          </GhostButton>
        </div>
        <div className="flex items-center gap-2 px-1">
          <GhostButton>
            <div className="p-1" data-token="style.text" style={{ color: cssVarStyleToken('text') }}>
              <SelectAllIcon width={14} height={14} />
            </div>
          </GhostButton>
          <GhostButton>
            <div className="p-1" data-token="style.text.muted" style={{ color: cssVarStyleToken('text.muted') }}>
              <ChevronLeftIcon width={14} height={14} />
            </div>
          </GhostButton>
          <GhostButton>
            <div className="p-1" data-token="style.text.muted" style={{ color: cssVarStyleToken('text.muted') }}>
              <ChevronRightIcon width={14} height={14} />
            </div>
          </GhostButton>
        </div>
      </div>
    </div>
  );
}

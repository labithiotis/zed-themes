import CaseInsensitiveIcon from '~/assets/icons/case_insensitive.svg?react';
import ChevronLeftIcon from '~/assets/icons/chevron_left.svg?react';
import ChevronRightIcon from '~/assets/icons/chevron_right.svg?react';
import InlayHintIcon from '~/assets/icons/inlay_hint.svg?react';
import MagicWandIcon from '~/assets/icons/magic_wand.svg?react';
import MagnifyingGlassIcon from '~/assets/icons/magnifying_glass.svg?react';
import ReplaceIcon from '~/assets/icons/replace.svg?react';
import SelectAllIcon from '~/assets/icons/select_all.svg?react';
import WordSearchIcon from '~/assets/icons/word_search.svg?react';
import {
  cssVarStyleToken,
  cssVarSyntaxColorToken,
} from '~/utils/cssVarTokens.ts';
import { GhostButton } from '../components/GhostButton.tsx';

export function Breadcrumbs() {
  return (
    <div
      class="flex flex-col border-b"
      style={{
        borderColor: cssVarStyleToken('border.variant'),
        backgroundColor: cssVarStyleToken('toolbar.background'),
      }}
    >
      <div id="editor-breadcrums" class="flex px-2 py-1">
        <div class="ml-1 flex flex-1 items-center">
          <GhostButton style={{ paddingInline: '4px' }}>
            <div class="flex items-center gap-2">
              <div
                class="text-md"
                style={{ color: cssVarStyleToken('text.muted') }}
              >
                src/pages/Home.tsx
              </div>
              <span
                class="text-xs"
                style={{ color: cssVarStyleToken('text.muted') }}
              >
                &gt;
              </span>
              <span
                class="text-md pr-1"
                style={{ color: cssVarSyntaxColorToken('keyword') }}
              >
                function
              </span>
              <span>
                <span
                  class="text-md"
                  style={{ color: cssVarSyntaxColorToken('type') }}
                >
                  App
                </span>
                <span
                  class="text-md"
                  style={{
                    color: cssVarSyntaxColorToken('punctuation.bracket'),
                  }}
                >
                  ()
                </span>
              </span>
            </div>
          </GhostButton>
        </div>
        <div class="flex items-center gap-2">
          <GhostButton>
            <div class="p-1" style={{ color: cssVarStyleToken('text') }}>
              <InlayHintIcon width={14} height={14} />
            </div>
          </GhostButton>
          <GhostButton>
            <div class="p-1" style={{ color: cssVarStyleToken('text.accent') }}>
              <MagnifyingGlassIcon width={14} height={14} />
            </div>
          </GhostButton>
          <GhostButton>
            <div class="p-1" style={{ color: cssVarStyleToken('text') }}>
              <MagicWandIcon width={14} height={14} />
            </div>
          </GhostButton>
        </div>
      </div>
      <div id="editor-search" class="flex justify-between pb-2 pl-2 pr-1 pt-1">
        <div class="flex flex-1 items-center gap-2">
          <div
            class="flex items-center gap-2 rounded-lg border px-2 py-1"
            style={{ borderColor: cssVarStyleToken('border') }}
          >
            <MagnifyingGlassIcon style={{ color: cssVarStyleToken('text') }} />
            <input
              class="placeholder-color bg-transparent text-sm outline-none"
              placeholder="Search (↑/↓ for previous/next query)"
              style={{
                '--placeholder-color': cssVarStyleToken('text.muted'),
                color: cssVarStyleToken('text'),
              }}
            />
            <GhostButton>
              <div class="p-1" style={{ color: cssVarStyleToken('text') }}>
                <CaseInsensitiveIcon width={14} height={14} />
              </div>
            </GhostButton>
            <GhostButton>
              <div class="p-1" style={{ color: cssVarStyleToken('text') }}>
                <WordSearchIcon width={14} height={14} />
              </div>
            </GhostButton>
          </div>
          <div
            class="border-md flex h-full items-stretch overflow-hidden rounded-lg"
            style={{
              backgroundColor: cssVarStyleToken('element.background'),
              '--bg-color': cssVarStyleToken('element.background'),
              '--bg-hover': cssVarStyleToken('element.hover'),
            }}
          >
            <span
              class="bg-hover text-md flex cursor-pointer items-center px-2"
              style={{ color: cssVarStyleToken('text.accent') }}
            >
              Text
            </span>
            <span
              class="bg-hover text-md flex cursor-pointer items-center px-2"
              style={{ color: cssVarStyleToken('text') }}
            >
              Regex
            </span>
          </div>
          <GhostButton>
            <div class="p-1" style={{ color: cssVarStyleToken('text') }}>
              <ReplaceIcon width={16} height={16} />
            </div>
          </GhostButton>
        </div>
        <div class="flex items-center gap-2 px-1">
          <GhostButton>
            <div class="p-1" style={{ color: cssVarStyleToken('text') }}>
              <SelectAllIcon width={14} height={14} />
            </div>
          </GhostButton>
          <GhostButton>
            <div class="p-1" style={{ color: cssVarStyleToken('text.muted') }}>
              <ChevronLeftIcon width={14} height={14} />
            </div>
          </GhostButton>
          <GhostButton>
            <div class="p-1" style={{ color: cssVarStyleToken('text.muted') }}>
              <ChevronRightIcon width={14} height={14} />
            </div>
          </GhostButton>
        </div>
      </div>
    </div>
  );
}

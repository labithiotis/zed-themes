import { languagePacks, useLanguage } from '~/providers/language';
import { cssVarStyleToken } from '~/utils/cssVarTokens';

export function Dock() {
  const { language } = useLanguage();

  return (
    <ul
      id="editor-right"
      className="min-w-[250px] list-none overflow-y-auto overflow-x-hidden"
      style={{
        backgroundColor: cssVarStyleToken('panel.background'),
      }}
    >
      {languagePacks[language].files.map(({ Icon, name, indent, selected }) => (
        <li
          key={name}
          className="ghost-element-hover px-3"
          style={{
            backgroundColor: selected ? cssVarStyleToken('ghost_element.selected') : undefined,
          }}
        >
          <div
            className="flex items-center gap-2 text-sm"
            style={{
              marginLeft: indent * 6,
            }}
          >
            <Icon width={16} height={16} style={{ color: cssVarStyleToken('text.muted') }} />
            <span
              className="whitespace-nowrap"
              style={{
                color: cssVarStyleToken(selected ? 'text' : 'text.muted'),
              }}
            >
              {name}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

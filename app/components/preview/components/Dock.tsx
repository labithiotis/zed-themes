import { languagePacks, useLanguage } from '~/providers/language';
import { cssVarStyleToken } from '~/utils/cssVarTokens';

export function Dock() {
  const language = useLanguage((s) => s.language);

  return (
    <ul
      id="editor-right"
      className="min-w-[250px] list-none overflow-y-auto overflow-x-hidden"
      data-token="style.panel.background"
      style={{
        backgroundColor: cssVarStyleToken('panel.background'),
      }}
    >
      {languagePacks[language ?? 'tsx'].files.map(({ Icon, name, indent, selected }) => (
        <li
          key={name}
          className="ghost-element-hover px-3"
          data-token={selected ? 'style.ghost_element.selected' : undefined}
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
            <span data-token="style.text.muted">
              <Icon width={16} height={16} style={{ color: cssVarStyleToken('text.muted') }} />
            </span>
            <span
              className="whitespace-nowrap"
              data-token={selected ? 'style.text' : 'style.text.muted'}
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

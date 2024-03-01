import CssIcon from '../../assets/icons/file_icons/css.svg?react';
import FileIcon from '../../assets/icons/file_icons/file.svg?react';
import FolderIcon from '../../assets/icons/file_icons/folder.svg?react';
import FolderOpenIcon from '../../assets/icons/file_icons/folder_open.svg?react';
import HtmlIcon from '../../assets/icons/file_icons/html.svg?react';
import PackageIcon from '../../assets/icons/file_icons/package.svg?react';
import PrettierIcon from '../../assets/icons/file_icons/prettier.svg?react';
import TypescriptIcon from '../../assets/icons/file_icons/typescript.svg?react';
import { cssVarStyleToken } from '../../utils/cssVarTokens.ts';

const files = [
  { Icon: FolderOpenIcon, name: 'zed', indent: 0 },
  { Icon: FolderIcon, name: '.github', indent: 2 },
  { Icon: FolderIcon, name: 'node_modules', indent: 2 },
  { Icon: FolderOpenIcon, name: 'src', indent: 2 },
  { Icon: FolderOpenIcon, name: 'components', indent: 4 },
  { Icon: FileIcon, name: 'Button.tsx', indent: 6 },
  { Icon: FolderOpenIcon, name: 'pages', indent: 4 },
  { Icon: TypescriptIcon, name: 'Contact.tsx', indent: 6 },
  { Icon: TypescriptIcon, name: 'Help.tsx', indent: 6 },
  { Icon: CssIcon, name: 'Home.css', indent: 6 },
  { Icon: TypescriptIcon, name: 'Home.tsx', indent: 6 },
  { Icon: TypescriptIcon, name: 'App.tsx', indent: 4 },
  { Icon: FileIcon, name: '.gitignore', indent: 2 },
  { Icon: PrettierIcon, name: '.prettierrc', indent: 2 },
  { Icon: HtmlIcon, name: 'index.html', indent: 2 },
  { Icon: FileIcon, name: 'index.js', indent: 2 },
  { Icon: PackageIcon, name: 'package.json', indent: 2 },
  { Icon: FileIcon, name: 'package-lock.json', indent: 2 },
  { Icon: FileIcon, name: 'tsconfig.json', indent: 2 },
];

export function Dock() {
  return (
    <ul
      id="editor-right"
      class="min-w-[150px] list-none overflow-y-auto overflow-x-hidden"
      style={{
        backgroundColor: cssVarStyleToken('panel.background'),
      }}
    >
      {files.map(({ Icon, name, indent }) => (
        <li
          class="ghost-element-hover px-3"
          style={{
            backgroundColor:
              name === 'App.tsx'
                ? cssVarStyleToken('ghost_element.selected')
                : undefined,
          }}
        >
          <div
            class="flex items-center gap-2 text-sm"
            style={{
              marginLeft: indent * 6,
            }}
          >
            <Icon
              width={16}
              height={16}
              style={{ color: cssVarStyleToken('text.muted') }}
            />
            <span
              class="whitespace-nowrap"
              style={{
                color: cssVarStyleToken(
                  name === 'App.tsx' ? 'text' : 'text.muted'
                ),
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

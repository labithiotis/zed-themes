import FileIcon from '~/assets/icons/file_icons/file.svg?react';
import FolderIcon from '~/assets/icons/file_icons/folder.svg?react';
import RustIcon from '~/assets/icons/file_icons/rust.svg?react';
import FolderOpenIcon from '~/assets/icons/file_icons/folder_open.svg?react';
import { Indent, LA, LAF, LB, LP, Popup, RA, RB, RP, SN, SP } from '~/components/preview/components/Code';
import type { LanguagePack } from '~/providers/language';
import { cssVarStyleToken, cssVarSyntaxColorToken } from '~/utils/cssVarTokens';

let counter = 0;
const key = () => counter++;

export const rustPack: LanguagePack = {
  activeRow: 11,
  tabs: ['main.rs', 'lib.rs', 'Cargo.toml'],
  files: [
    { Icon: FolderOpenIcon, name: 'my_rust_project', indent: 0 },
    { Icon: FolderIcon, name: 'src', indent: 2 },
    { Icon: RustIcon, name: 'main.rs', indent: 4, selected: true },
    { Icon: RustIcon, name: 'lib.rs', indent: 4 },
    { Icon: FolderIcon, name: 'modules', indent: 4 },
    { Icon: RustIcon, name: 'user_service.rs', indent: 6 },
    { Icon: FileIcon, name: 'Cargo.toml', indent: 2 },
    { Icon: FileIcon, name: '.gitignore', indent: 2 },
    { Icon: FileIcon, name: 'README.md', indent: 2 },
  ],
  breadcrumbs: [
    <div className="text-md" key={key()} style={{ color: cssVarStyleToken('text.muted') }}>
      src/main.rs
    </div>,
    <span className="text-xs" key={key()} style={{ color: cssVarStyleToken('text.muted') }}>
      &gt;
    </span>,
    <span className="text-md pr-1" key={key()} style={{ color: cssVarSyntaxColorToken('keyword') }}>
      fn
    </span>,
    <span key={key()}>
      <span className="text-md" style={{ color: cssVarSyntaxColorToken('function') }}>
        main
      </span>
      <span className="text-md" style={{ color: cssVarSyntaxColorToken('punctuation.bracket') }}>
        ()
      </span>
    </span>,
  ],
  lines: [
    <SN key={key()} s="keyword">
      use
    </SN>,
    <span key={key()}>
      <Indent />
      <SN s="namespace">std</SN>
      <SN s="punctuation.delimiter">::</SN>
      <SN s="namespace">collections</SN>
      <SN s="punctuation.delimiter">::</SN>
      <SN s="type">HashMap</SN>
      <SN s="punctuation.delimiter">;</SN>
    </span>,
    <span key={key()}>
      <Indent />
      <SN s="namespace">crate</SN>
      <SN s="punctuation.delimiter">::</SN>
      <SN s="namespace">modules</SN>
      <SN s="punctuation.delimiter">::</SN>
      <SN s="namespace">user_service</SN>
      <SN s="punctuation.delimiter">::</SN>
      <SN s="type">UserService</SN>
      <SN s="punctuation.delimiter">;</SN>
    </span>,
    '',
    <SN key={key()} s="comment">
      // Define a struct for User
    </SN>,
    <span key={key()}>
      <SN s="keyword">struct</SN>
      <SP />
      <SN s="type">User</SN>
      <SP />
      <LB />
    </span>,
    <span key={key()}>
      <Indent />
      <SN s="property">id</SN>
      <SN s="punctuation.delimiter">:</SN>
      <SP />
      <SN s="type">String</SN>
      <SN s="punctuation.delimiter">,</SN>
    </span>,
    <span key={key()}>
      <Indent />
      <SN s="property">name</SN>
      <SN s="punctuation.delimiter">:</SN>
      <SP />
      <SN s="type">String</SN>
      <SN s="punctuation.delimiter">,</SN>
    </span>,
    <span key={key()}>
      <Indent />
      <SN s="property">age</SN>
      <SN s="punctuation.delimiter">:</SN>
      <SP />
      <SN s="type">u32</SN>
      <SN s="punctuation.delimiter">,</SN>
    </span>,
    <RB />,
    '',
    <span key={key()}>
      <SN s="keyword">fn</SN>
      <SP />
      <SN s="function">main</SN>
      <LP />
      <RP />
      <SP />
      <LB />
    </span>,
    <span key={key()}>
      <Indent />
      <SN s="keyword">let</SN>
      <SP />
      <SN s="keyword">mut</SN>
      <SP />
      <SN s="variable">user_service</SN>
      <SP />
      <SN s="operator">=</SN>
      <SP />
      <SN s="type">UserService</SN>
      <SN s="punctuation.delimiter">::</SN>
      <SN s="function">new</SN>
      <LP />
      <RP />
      <SN s="punctuation.delimiter">;</SN>
    </span>,
    '',
    <span key={key()}>
      <Indent />
      <SN s="keyword">let</SN>
      <SP />
      <SN s="variable">user</SN>
      <SP />
      <SN s="operator">=</SN>
      <SP />
      <SN s="type">User</SN>
      <SP />
      <LB />
    </span>,
    <span key={key()}>
      <Indent />
      <Indent />
      <SN s="property">id</SN>
      <SN s="punctuation.delimiter">:</SN>
      <SP />
      <SN s="string">"123"</SN>
      <SN s="punctuation.delimiter">.</SN>
      <SN s="function">to_string</SN>
      <LP />
      <RP />
      <SN s="punctuation.delimiter">,</SN>
    </span>,
    <span key={key()}>
      <Indent />
      <Indent />
      <SN s="property">name</SN>
      <SN s="punctuation.delimiter">:</SN>
      <SP />
      <SN s="string">"Alice"</SN>
      <SN s="punctuation.delimiter">.</SN>
      <SN s="function">to_string</SN>
      <LP />
      <RP />
      <SN s="punctuation.delimiter">,</SN>
    </span>,
    <span key={key()}>
      <Indent />
      <Indent />
      <SN s="property">age</SN>
      <SN s="punctuation.delimiter">:</SN>
      <SP />
      <SN s="number">30</SN>
      <SN s="punctuation.delimiter">,</SN>
    </span>,
    <span key={key()}>
      <Indent />
      <RB />
      <SN s="punctuation.delimiter">;</SN>
    </span>,
    '',
    <span key={key()}>
      <Indent />
      <SN s="keyword">match</SN>
      <SP />
      <SN s="variable">user_service</SN>
      <SN s="punctuation.delimiter">.</SN>
      <SN s="function">add_user</SN>
      <LP />
      <SN s="variable">user</SN>
      <RP />
      <SP />
      <LB />
    </span>,
    <span key={key()}>
      <Indent />
      <Indent />
      <SN s="type">Ok</SN>
      <LP />
      <SN s="variable">_</SN>
      <RP />
      <SP />
      <SN s="operator">=&gt;</SN>
      <SP />
      <SN s="function">println!</SN>
      <LP />
      <SN s="string">"User added successfully"</SN>
      <RP />
      <SN s="punctuation.delimiter">,</SN>
    </span>,
    <span key={key()}>
      <Indent />
      <Indent />
      <SN s="type">Err</SN>
      <LP />
      <SN s="variable">e</SN>
      <RP />
      <SP />
      <SN s="operator">=&gt;</SN>
      <SP />
      <SN s="function">eprintln!</SN>
      <LP />
      <SN s="string">
        "Error adding user: {'{'}e{'}'}"
      </SN>
      <RP />
      <SN s="punctuation.delimiter">,</SN>
    </span>,
    <span key={key()}>
      <Indent />
      <RB />
    </span>,
    <RB />,
  ],
};

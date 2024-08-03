import ReadmeIcon from '~/assets/icons/file_icons/book.svg?react';
import DatabaseIcon from '~/assets/icons/file_icons/database.svg?react';
import FileIcon from '~/assets/icons/file_icons/file.svg?react';
import FolderIcon from '~/assets/icons/file_icons/folder.svg?react';
import FolderOpenIcon from '~/assets/icons/file_icons/folder_open.svg?react';
import { Indent, LA, LB, LP, LSB, RA, RB, RP, RSB, SN, SP } from '~/components/preview/components/Code';
import type { LanguagePack } from '~/providers/language';
import { cssVarStyleToken, cssVarSyntaxColorToken } from '~/utils/cssVarTokens';

let counter = 1;
const key = () => counter++;

export const csharpPack: LanguagePack = {
  activeRow: 14,
  tabs: ['UserService.cs', 'Program.cs', 'User.cs'],
  files: [
    { Icon: FolderOpenIcon, name: 'zed', indent: 0 },
    { Icon: FolderIcon, name: '.github', indent: 2 },
    { Icon: FolderIcon, name: 'build', indent: 2 },
    { Icon: FolderOpenIcon, name: 'src', indent: 2 },
    { Icon: FolderOpenIcon, name: 'Identity.API', indent: 4 },
    { Icon: FolderIcon, name: 'bin', indent: 6 },
    { Icon: FolderIcon, name: 'Validations', indent: 6 },
    { Icon: FolderIcon, name: 'obj', indent: 6 },
    { Icon: FolderIcon, name: 'Services', indent: 6 },
    { Icon: FileIcon, name: 'UserService.cs', indent: 8, selected: true },
    { Icon: DatabaseIcon, name: 'appsettings.json', indent: 6 },
    { Icon: FileIcon, name: 'Identity.csproj', indent: 6 },
    { Icon: FileIcon, name: 'GlobalUsings.cs', indent: 6 },
    { Icon: FileIcon, name: 'Program.cs', indent: 6 },
    { Icon: FolderOpenIcon, name: 'tests', indent: 2 },
    { Icon: FolderIcon, name: 'Identity.UnitTests', indent: 4 },
    { Icon: FileIcon, name: '.gitignore', indent: 2 },
    { Icon: FileIcon, name: 'app.sln', indent: 2 },
    { Icon: ReadmeIcon, name: 'README.md', indent: 2 },
  ],
  breadcrumbs: [
    <div className="text-md" key={key()} style={{ color: cssVarStyleToken('text.muted') }}>
      src/Identity.API/Services/UserService.cs
    </div>,
    <span className="text-xs" key={key()} style={{ color: cssVarStyleToken('text.muted') }}>
      &gt;
    </span>,
    <span className="text-md pr-1" key={key()} style={{ color: cssVarSyntaxColorToken('keyword') }}>
      class
    </span>,
    <span key={key()}>
      <span className="text-md" style={{ color: cssVarSyntaxColorToken('type') }}>
        UserService
      </span>
      <span
        className="text-md"
        style={{
          color: cssVarSyntaxColorToken('punctuation.bracket'),
        }}
      />
    </span>,
  ],
  lines: [
    <div key={key()}>
      <span
        style={{
          textDecorationColor: cssVarStyleToken('error'),
        }}
      >
        <SN s="keyword">using</SN>
        <SP />
        <SN s="editor.foreground">System</SN>
        <SN s="punctuation">.</SN>
        <SN s="editor.foreground">Diagnostics</SN>
        <SN s="punctuation">.</SN>
        <SN s="editor.foreground">CodeAnalysis</SN>
        <SN s="punctuation">;</SN>
      </span>
    </div>,
    '',
    <span key={key()}>
      <SN s="keyword">public</SN>
      <SP />
      <SN s="keyword">class</SN>
      <SP />
      <SN s="type">UserService</SN>
      <SP />
      <SN s="punctuation.delimiter">:</SN>
      <SP />
      <SN s="type">IUserService</SN>
      <SP />
    </span>,
    <span key={key()}>
      <LB />
    </span>,
    <span key={key()}>
      <Indent level={2} />
      <SN s="keyword">public</SN>
      <SP />
      <SN s="type">IEnumerable</SN>
      <LA />
      <SN s="type.builtin">string</SN>
      <RA />
      <SP />
      <SN s="variable">Errors</SN>
      <SP />
      <LB />
      <SP />
      <SN s="keyword">get</SN>
      <SN s="punctuation">;</SN>
      <SP />
      <SN s="keyword">set</SN>
      <SN s="punctuation">;</SN>
      <SP />
      <RB />
    </span>,
    '',
    <span key={key()}>
      <Indent level={2} />
      <SN s="keyword">public</SN>
      <SP />
      <SN s="constructor">UserService</SN>
      <LP />
      <SN s="variable">ILogger</SN>
      <SP />
      <SN s="variable">logger</SN>
      <RP />
      <SP />
    </span>,
    <span key={key()}>
      <Indent level={2} />
      <LB />
    </span>,
    <span key={key()}>
      <Indent level={4} />
      <SN s="variable">_logger</SN>
      <SP />
      <SN s="operator">=</SN>
      <SP />
      <SN s="variable">logger</SN>
      <SN s="punctuation">;</SN>
    </span>,
    <span key={key()}>
      <Indent level={2} />
      <RB />
    </span>,
    '',
    <span key={key()}>
      <Indent level={2} />
      <LSB />
      <SN s="attribute">AllowAnonymous</SN>
      <RSB />
    </span>,
    <span key={key()}>
      <Indent level={2} />
      <SN s="keyword">public</SN>
      <SP />
      <SN s="keyword">async</SN>
      <SP />
      <SN s="type">Task</SN>
      <LA />
      <SN s="type">User</SN>
      <RA />
      <SP />
      <SN s="function">GetUser</SN>
      <LP />
      <SN s="type.builtin">string</SN>
      <SP />
      <SN s="variable">id</SN>
      <RP />
      <SP />
    </span>,
    <span key={key()}>
      <Indent level={2} />
      <LB />
    </span>,
    <span key={key()} className="flex">
      <Indent level={4} />
      <SN s="type.builtin">var</SN>
      <SP />
      <SN s="variable">uri</SN>
      <SP />
      <SN s="operator">=</SN>
      <SP />
      <SN s="editor.foreground">UriHelper</SN>
      <SN s="punctuation">.</SN>
      <SN s="function">CombineUri</SN>
      <LP />
      <SN s="editor.foreground">GlobalSetting</SN>
      <SN s="punctuation">.</SN>
      <SN s="editor.foreground">UserInfoEndpoint</SN>
      <RP />
      <SN s="punctuation">;</SN>
      <span
        className="blink h-full"
        style={{
          backgroundColor: cssVarStyleToken('text.accent'),
          width: '2px',
        }}
      />
    </span>,
    '',
    <span key={key()}>
      <Indent level={4} />
      <SN s="comment">&#47;&#47; This is a single comment on a single line</SN>
    </span>,
    <span key={key()}>
      <Indent level={4} />
      <SN s="type.builtin">var</SN>
      <SP />
      <SN s="variable">count</SN>
      <SP />
      <SN s="operator">=</SN>
      <SP />
      <SN s="number">256</SN>
      <SN s="punctuation">;</SN>
    </span>,
    <span key={key()}>
      <Indent level={4} />
      <SN s="type.builtin">var</SN>
      <SP />
      <SN s="variable">userInfo</SN>
      <SP />
      <SN s="operator">=</SN>
      <SP />
      <SN s="keyword">await</SN>
      <SP />
      <SN s="editor.foreground">_requestProvider</SN>
      <SN s="punctuation">.</SN>
      <SN s="type">GetAsync</SN>
      <LA />
      <SN s="type">UserInfo</SN>
      <RA />
      <LP />
      <SN s="editor.foreground">uri</SN>
      <RP />
      <SN s="punctuation">;</SN>
    </span>,
    <span key={key()}>
      <Indent level={4} />
      <SN s="type.builtin">var</SN>
      <SP />
      <SN s="variable">user</SN>
      <SP />
      <SN s="operator">=</SN>
      <SP />
      <SN s="editor.foreground">subject</SN>
      <SN s="punctuation">.</SN>
      <SN s="editor.foreground">Claims</SN>
      <SN s="punctuation">.</SN>
      <SN s="function">Where</SN>
      <LP />
      <SN s="variable">x</SN>
      <SP />
      <SN s="operator">=&gt;</SN>
      <SP />
      <SN s="variable">x</SN>
      <SN s="boolean">.</SN>
      <SN s="variable">Type</SN>
      <SP />
      <SN s="operator">==</SN>
      <SP />
      <SN s="string">"sub"</SN>
      <RP />
      <SN s="punctuation">.</SN>
      <SN s="function">FirstOrDefault</SN>
      <LP />
      <RP />
      <SN s="operator">?</SN>
      <SN s="punctuation">.</SN>
      <SN s="editor.foreground">Value</SN>
      <SN s="punctuation">;</SN>
    </span>,
    '',
    <span key={key()}>
      <Indent level={4} />
      <SN s="keyword">if</SN>
      <SP />
      <LP />
      <SN s="variable">user</SN>
      <SP />
      <SN s="operator">==</SN>
      <SP />
      <SN s="constant">null</SN>
      <RP />
    </span>,
    <span key={key()}>
      <Indent level={4} />
      <LB />
    </span>,
    <span key={key()}>
      <Indent level={6} />
      <SN s="editor.foreground">_logger</SN>
      <SN s="punctuation">.</SN>
      <SN s="function">LogInfo</SN>
      <LP />
      <SN s="string">
        $"This is a
        <SP />
        <LB />
      </SN>
      <SN s="editor.foreground">id</SN>
      <SN s="string">
        <RB />
        <SP />
        generic error string with interpolated id.
      </SN>
      <RP />
      <SN s="punctuation">;</SN>
    </span>,
    <span key={key()}>
      <Indent level={6} />
      <SN s="keyword">throw</SN>
      <SP />
      <SN s="keyword">new</SN>
      <SP />
      <SN s="type">NotFoundException</SN>
      <LP />
      <SN s="string">
        $"This is a
        <SP />
        <LB />
      </SN>
      <SN s="editor.foreground">id</SN>
      <SN s="string">
        <RB />
        <SP />
        generic error.
      </SN>
      <RP />
      <SN s="punctuation">;</SN>
    </span>,
    <span key={key()}>
      <Indent level={4} />
      <RB />
    </span>,
    '',
    <span key={key()}>
      <Indent level={4} />
      <SN s="keyword">if</SN>
      <SP />
      <LP />
      <SN s="editor.foreground">client</SN>
      <SN s="punctuation">.</SN>
      <SN s="editor.foreground">IdentityProviderRestrictions</SN>
      <SP />
      <SN s="operator">!=</SN>
      <SP />
      <SN s="constant">null</SN>
      <SP />
      <SN s="operator">&&</SN>
      <SP />
      <SN s="editor.foreground">client</SN>
      <SN s="punctuation">.</SN>
      <SN s="editor.foreground">IdentityProviderRestrictions</SN>
      <SN s="punctuation">.</SN>
      <SN s="function">Any</SN>
      <LP />
      <RP />
      <RP />
    </span>,
    <span key={key()} className="flex">
      <Indent level={4} />
      <LB />
    </span>,
    <span key={key()} className="flex">
      <Indent level={6} />
      <SN s="variable">providers</SN>
      <SP />
      <SN s="operator">=</SN>
      <SP />
      <SN s="editor.foreground">providers</SN>
    </span>,
    <span key={key()}>
      <Indent level={8} />
      <SN s="punctuation">.</SN>
      <SN s="function">Where</SN>
      <LP />
      <SN s="variable">provider</SN>
      <SP />
      <SN s="operator">=&gt;</SN>
      <SP />
      <SN s="variable">client</SN>
    </span>,
    <span key={key()}>
      <Indent level={10} />
      <SN s="punctuation">.</SN>
      <SN s="variable">IdentityProviderRestrictions</SN>
    </span>,
    <span key={key()}>
      <Indent level={10} />
      <SN s="punctuation">.</SN>
      <SN s="function">Contains</SN>
      <LP />
      <SN s="variable">provider</SN>
      <SN s="punctuation">.</SN>
      <SN s="variable">AuthenticationScheme</SN>
      <RP />
    </span>,
    <span key={key()}>
      <Indent level={6} />
      <RP />
    </span>,
    <span key={key()}>
      <Indent level={6} />
      <SN s="punctuation">.</SN>
      <SN s="function">ToList</SN>
      <LP />
      <RP />
      <SN s="punctuation">;</SN>
    </span>,
    <span key={key()}>
      <Indent level={4} />
      <RB />
    </span>,
    '',
    <span key={key()}>
      <Indent level={4} />
      <SN s="keyword">if</SN>
      <SP />
      <LP />
      <SN s="editor.foreground">providers</SN>
      <SN s="punctuation">.</SN>
      <SN s="editor.foreground">Length</SN>
      <SP />
      <SN s="operator">!=</SN>
      <SP />
      <SN s="number">0</SN>
      <RP />
    </span>,
    <span key={key()}>
      <Indent level={4} />
      <LB />
    </span>,
    <span key={key()}>
      <Indent level={6} />
      <SN s="editor.foreground">CryptographyBuffer</SN>
      <SN s="punctuation">.</SN>
      <SN s="function">CopyToByteArray</SN>
      <LP />
      <SN s="editor.foreground">challengeBuffer</SN>
      <SN s="punctuation">,</SN>
      <SP />
      <SN s="keyword">out</SN>
      <SP />
      <SN s="type.builtin">byte</SN>
      <LSB />
      <RSB />
      <SP />
      <SN s="editor.foreground">challengeBytes</SN>
      <RP />
      <SN s="punctuation">;</SN>
    </span>,
    <span key={key()}>
      <Indent level={6} />
      <SN s="keyword">return</SN>
      <SP />
      <SN s="keyword">new</SN>
      <SP />
      <SN s="type">User</SN>
      <LP />
      <SN s="editor.foreground">challengeBytes</SN>
      <RP />
      <SN s="punctuation">;</SN>
    </span>,
    <span key={key()}>
      <Indent level={4} />
      <RB />
    </span>,
    <span key={key()}>
      <Indent level={2} />
      <RB />
    </span>,
    <span key={key()}>
      <RB />
    </span>,
  ],
};

import CssIcon from '~/assets/icons/file_icons/css.svg?react';
import FileIcon from '~/assets/icons/file_icons/file.svg?react';
import FolderIcon from '~/assets/icons/file_icons/folder.svg?react';
import FolderOpenIcon from '~/assets/icons/file_icons/folder_open.svg?react';
import HtmlIcon from '~/assets/icons/file_icons/html.svg?react';
import PackageIcon from '~/assets/icons/file_icons/package.svg?react';
import PrettierIcon from '~/assets/icons/file_icons/prettier.svg?react';
import TypescriptIcon from '~/assets/icons/file_icons/typescript.svg?react';
import { Indent, LA, LAF, LB, LP, Popup, RA, RB, RP, SN, SP } from '~/components/preview/components/Code';
import type { LanguagePack } from '~/providers/language';
import { cssVarStyleToken, cssVarSyntaxColorToken } from '~/utils/cssVarTokens';

let counter = 0;
const key = () => counter++;

export const tsxPack: LanguagePack = {
  activeRow: 11,
  tabs: ['App.tsx', 'index.html', 'package.json'],
  files: [
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
    { Icon: TypescriptIcon, name: 'App.tsx', indent: 4, selected: true },
    { Icon: FileIcon, name: '.gitignore', indent: 2 },
    { Icon: PrettierIcon, name: '.prettierrc', indent: 2 },
    { Icon: HtmlIcon, name: 'index.html', indent: 2 },
    { Icon: FileIcon, name: 'index.js', indent: 2 },
    { Icon: PackageIcon, name: 'package.json', indent: 2 },
    { Icon: FileIcon, name: 'package-lock.json', indent: 2 },
    { Icon: FileIcon, name: 'tsconfig.json', indent: 2 },
  ],
  breadcrumbs: [
    <div className="text-md" key={key()} style={{ color: cssVarStyleToken('text.muted') }}>
      src/pages/Home.tsx
    </div>,
    <span className="text-xs" key={key()} style={{ color: cssVarStyleToken('text.muted') }}>
      &gt;
    </span>,
    <span className="text-md pr-1" key={key()} style={{ color: cssVarSyntaxColorToken('keyword') }}>
      function
    </span>,
    <span key={key()}>
      <span className="text-md" style={{ color: cssVarSyntaxColorToken('type') }}>
        App
      </span>
      <span
        className="text-md"
        style={{
          color: cssVarSyntaxColorToken('punctuation.bracket'),
        }}
      >
        ()
      </span>
    </span>,
  ],
  lines: [
    <div key="line1">
      <span
        style={{
          textDecorationLine: 'underline',
          textDecorationStyle: 'wavy',
          textDecorationColor: cssVarStyleToken('error'),
        }}
      >
        <SN s="keyword">import</SN>
        <SP />
        <SN s="variable">fs</SN>
        <SP />
        <SN s="keyword">from</SN>
        <SP />
        <SN s="string">&#34;fs&#34;</SN>
        <SN s="punctuation.delimiter">;</SN>
      </span>
      <br />
      <span
        style={{
          color: cssVarStyleToken('error'),
        }}
      >
        &#39;fs&#39; is declared but its value is never read.
      </span>
    </div>,
    <SN key="line2" s="comment">
      &#47;&#47; simple comment
    </SN>,
    <SN key="line3" s="comment.doc">
      &#47;** @param &#123;string&#125; a block comment **&#47;
    </SN>,
    <span key="line4">
      <SN s="keyword">type</SN>
      <SP />
      <SN s="type">Prop</SN>
      <SP />
      <SN s="operator">=</SN>
      <SP />
      <LB />
      <SP />
      <SN s="property">a</SN>
      <SN s="punctuation.delimiter">;</SN>
      <SP />
      <SN s="type">boolean</SN>
      <SN s="punctuation.delimiter">;</SN>
      <SP />
      <SN s="property">b</SN>
      <SN s="punctuation.delimiter">:</SN>
      <SP />
      <SN s="constant">null</SN>
      <SN s="punctuation.delimiter">;</SN>
      <SP />
      <SN s="property">c</SN>
      <SN s="punctuation.delimiter">:</SN>
      <SP />
      <SN s="type">string</SN>
      <SP />
      <RB />
      <SN s="punctuation.delimiter">;</SN>
    </span>,
    <span key="line5">
      <SN s="keyword">enum</SN>
      <SP />
      <SN s="type">
        <Popup
          style={{
            color: cssVarStyleToken('error'),
            backgroundColor: cssVarStyleToken('error.background'),
            borderColor: cssVarStyleToken('error.border'),
          }}
          content="'Enum' is declared but never used."
        >
          <span
            style={{
              textDecorationLine: 'underline',
              textDecorationStyle: 'wavy',
              textDecorationColor: cssVarStyleToken('error'),
            }}
          >
            Enum
          </span>
        </Popup>
      </SN>
      <SP />
      <LB />
      <SP />
      <SN s="property">zed</SN>
      <SP />
      <SN s="operator">=</SN>
      <SP />
      <SN s="string">&#39;zed&#39;</SN>
      <SP />
      <RB />
    </span>,
    <span key="line6">
      <SN s="keyword">const</SN>
      <SP />
      <SN s="variable">number</SN>
      <SP />
      <SN s="operator">=</SN>
      <SP />
      <SN s="number">1</SN>
      <SN s="punctuation.delimiter">;</SN>
    </span>,
    <span key="line7">
      <SN s="keyword">const</SN>
      <SP />
      <SN s="variable">string</SN>
      <SP />
      <SN s="operator">=</SN>
      <SP />
      <Popup
        style={{
          color: cssVarStyleToken('warning'),
          backgroundColor: cssVarStyleToken('warning.background'),
          borderColor: cssVarStyleToken('warning.border'),
        }}
        content={'Typo in the word "strig"'}
      >
        <span
          style={{
            textDecorationLine: 'underline',
            textDecorationStyle: 'wavy',
            textDecorationColor: cssVarStyleToken('warning'),
          }}
        >
          <SN s="string">&#34;strig&#34;</SN>
        </span>
      </Popup>

      <SN s="punctuation.delimiter">;</SN>
    </span>,
    <span key="line8">
      <SN s="keyword">const</SN>
      <SP />
      <SN s="variable">boolean</SN>
      <SP />
      <SN s="operator">=</SN>
      <SP />
      <SN s="boolean">true</SN>
      <SN s="punctuation.delimiter">;</SN>
    </span>,
    <span key="line9">
      <SN s="keyword">const</SN>
      <SP />
      <SN s="variable">object</SN>
      <SP />
      <SN s="operator">=</SN>
      <SP />
      <LB />
      <SP />
      <SN s="property">id</SN>
      <SN s="punctuation.delimiter">:</SN>
      <SP />
      <SN s="string">`</SN>
      <SN s="punctuation.special">$&#123;</SN>
      <SN s="variable">string</SN>
      <SN s="punctuation.special">&#125;</SN>
      <SN s="string">_id1`</SN>
      <SP />
      <RB />
      <SP />
      <SN s="punctuation.delimiter">;</SN>
    </span>,
    <span key="line10">
      <SN s="keyword">const</SN>
      <SP />
      <SN s="variable">regex</SN>
      <SP />
      <SN s="operator">=</SN>
      <SP />
      <SN s="operator">/</SN>
      <SN s="string.regex">(L^\d]string).*</SN>
      <SN s="operator">/</SN>
      <SN s="string.regex">i</SN>
      <SN s="punctuation.delimiter">;</SN>
    </span>,
    '',
    <span key="line11" className="flex">
      <SN s="keyword">export</SN>
      <SP />
      <SN s="keyword">default</SN>
      <SP />
      <SN s="keyword">function</SN>
      <SP />
      <SN s="type">App</SN>
      <SN s="keyword">
        <LA />
      </SN>
      <SN s="type">T</SN>
      <SP />
      <SN s="keyword">extends</SN>
      <SP />
      <SN s="type">Prop</SN>
      <SP />
      <SN s="operator">=</SN>
      <SP />
      <SN s="type">object</SN>
      <SN s="keyword">
        <RA />
      </SN>
      <LP />
      <SN s="variable">p</SN>
      <SN s="punctuation.delimiter">:</SN>
      <SP />
      <SN s="type">T</SN>
      <RP />
      <SN s="punctuation.delimiter">:</SN>
      <SP />
      <SN s="type">any</SN>
      <SP />
      <LB />
      <SP />
      <span
        className="blink h-full"
        style={{
          backgroundColor: cssVarStyleToken('text.accent'),
          width: '2px',
        }}
      />
    </span>,
    <span key="line12">
      <Indent />
      <SN s="keyword">if</SN>
      <SP />
      <LP />
      <SN s="variable">p</SN>
      <SP />
      <SN s="operator">==</SN>
      <SP />
      <SN s="boolean">true</SN>
      <RP />
      <SP />
      <SN s="keyword">return</SN>
      <SP />
      <SN s="constant">null</SN>
      <SN s="punctuation.delimiter">;</SN>
    </span>,
    <span key="line13">
      <Indent />
      <SN s="keyword">return</SN>
      <SP />
      <LP />
    </span>,
    <span key="line14">
      <Indent />
      <Indent />
      <LA />
      <SN s="tag">div</SN>
      <SP />
      <SN s="attribute">className</SN>
      <SN s="keyword">=</SN>
      <SN s="string">&#34;class1&#34;</SN>
      <SP />
      <SN s="attribute">style</SN>
      <SN s="keyword">=</SN>
      <LB />
      <LB />
      <SP />
      <SN s="property">test</SN>
      <SN s="punctuation.delimiter">:</SN>
      <SP />
      <SN s="number">1</SN>
      <SP />
      <RB />
      <RB />
      <RA />
    </span>,
    <span key="line15">
      <Indent />
      <Indent />
      <Indent />
      hello world
      <SP />
      <LB />
      <SN s="variable">p</SN>
      <SN s="punctuation.delimiter">.</SN>
      <SN s="property">name</SN>
      <RB />!
    </span>,
    <span key="line16">
      <Indent />
      <Indent />
      <LAF />
      <SN s="tag">div</SN>
      <RA />
    </span>,
    <span key="line17">
      <Indent />
      <RP />
    </span>,
    <span key="line18">
      <RB />
      <SN s="punctuation.delimiter">;</SN>
    </span>,
    '',
    <span key="line19">
      <SN s="keyword">class</SN>
      <SP />
      <SN s="type">
        <Popup
          style={{
            color: cssVarStyleToken('error'),
            backgroundColor: cssVarStyleToken('error.background'),
            borderColor: cssVarStyleToken('error.border'),
          }}
          content="'Test' is declared but never used."
        >
          <span
            style={{
              textDecorationLine: 'underline',
              textDecorationStyle: 'wavy',
              textDecorationColor: cssVarStyleToken('error'),
            }}
          >
            Test
          </span>
        </Popup>
      </SN>
      <SP />
      <LB />
    </span>,
    <span key="line20">
      <Indent />
      <SN s="keyword">private</SN>
      <SP />
      <SN s="keyword">readonly</SN>
      <SP />
      <SN s="variable">name</SN>
      <SN s="punctuation.delimiter">:</SN>
      <SP />
      <SN s="type">string</SN>
      <SN s="punctuation.delimiter">;</SN>
    </span>,
    <span key="line24">
      <Indent />
      <SN s="constructor">@guard</SN>
      <LP />
      <LB />
      <SP />
      <SN s="property">description</SN>
      <SN s="punctuation.delimiter">:</SN>
      <SP />
      <SN s="string">&#39;Gets name&#39;</SN>
      <SP />
      <RB />
      <RP />
    </span>,
    <span key="line25">
      <Indent />
      <SN s="keyword">public</SN>
      <SP />
      <SN s="function.method">getName</SN>
      <LP />
      <RP />
      <SP />
      <LB />
    </span>,
    <span key="line26">
      <Indent />
      <Indent />
      <SN s="keyword">return</SN>
      <SP />
      <SN s="variable.special">this</SN>
      <SN s="punctuation.delimiter">.</SN>
      <SN s="variable">name</SN>
      <SN s="punctuation.delimiter">;</SN>
    </span>,
    <span key="line27">
      <Indent />
      <RB />
    </span>,
    <span key="line28">
      <RB />
    </span>,
    '',
  ],
};

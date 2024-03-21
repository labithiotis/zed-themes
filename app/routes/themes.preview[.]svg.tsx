import { LoaderFunction } from '@remix-run/cloudflare';
import { ThemeContent, ThemeFamilyContent } from '../themeFamily.js';
import { SyntaxTokens } from '~/providers/tokens.js';

export const loader: LoaderFunction = async ({ request, context }) => {
  const themeId = new URL(request.url).searchParams.get('id');
  if (!themeId) throw new Error('No theme id');
  const value = await context.env?.themes?.get(themeId);
  const theme = value ? (JSON.parse(value) as ThemeFamilyContent) : undefined;

  return new Response(generatePreview(theme?.themes?.at(0)), {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=604800, s-maxage=604800, stale-while-revalidate=604800',
    },
  });
};

function generatePreview(theme?: ThemeContent) {
  return `<svg viewBox="0 0 460 330" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif">

  <rect id="code" width="460" height="330" rx="8" fill="${getStyleColor(theme, 'editor.background', '#212121')}" />

  <rect id="tab" x="0" y="20" width="460" height="20" fill="${getStyleColor(theme, 'tab_bar.background', '#363636')}" />

  <svg x="0" y="20" width="116" height="20">
    <rect id="active-tab" x="0" y="0" width="116" height="20" fill="${getStyleColor(theme, 'tab.active_background', '#2e2e2e')}" />
    <text id="active-tab-text" x="50px" y="10px" text-anchor="middle" dominant-baseline="middle" fill="${getStyleColor(theme, 'text', '#fff')}" font-size="11">
      <tspan>main.js</tspan>
    </text>
  </svg>

  <path id="header" d="M0 8C0 3.58172 3.58172 0 8 0H452C456.418 0 460 3.58172 460 8V20H0V8Z" fill="${getStyleColor(theme, 'title_bar.background', '#525252')}" />
  <circle cx="11" cy="10" r="4" fill="grey" />
  <circle cx="27" cy="10" r="4" fill="grey" />
  <circle cx="44" cy="10" r="4" fill="grey" />
  <text id="project-name" x="70px" y="14" text-anchor="middle" fill="${getStyleColor(theme, 'text', '#fff')}" font-size="11">zed</text>

  <path id="status" d="M0 311H460V323C460 327.418 456.418 331 452 331H8.00001C3.58173 331 0 327.418 0 323V311Z" fill="${getStyleColor(theme, 'status_bar.background', '#363636')}" />

  <path id="error-icon" fill-rule="evenodd" clip-rule="evenodd"
    d="M14.4246 316.011C15.5636 316.082 16.6314 316.651 17.4145 317.434C18.3399 318.431 18.8382 319.641 18.8382 321.065C18.8382 322.204 18.4111 323.272 17.6992 324.197C16.9873 325.051 15.9907 325.692 14.8517 325.906C13.7127 326.119 12.5737 325.977 11.5771 325.407C10.5805 324.838 9.7974 323.984 9.37027 322.916C8.94315 321.848 8.87196 320.638 9.2279 319.57C9.58384 318.431 10.2245 317.506 11.2211 316.865C12.1466 316.224 13.2856 315.939 14.4246 316.011ZM14.7805 325.194C15.706 324.98 16.5602 324.482 17.2009 323.699C17.7704 322.916 18.1263 321.99 18.0551 320.994C18.0551 319.855 17.628 318.716 16.845 317.933C16.1331 317.221 15.2788 316.794 14.2822 316.723C13.3568 316.651 12.3601 316.865 11.5771 317.434C10.794 318.004 10.2245 318.787 9.93977 319.784C9.65502 320.709 9.65502 321.706 10.0821 322.631C10.5093 323.557 11.15 324.268 12.0042 324.767C12.8585 325.265 13.8551 325.407 14.7805 325.194V325.194ZM13.9263 320.638L15.6348 318.858L16.1331 319.356L14.4246 321.136L16.1331 322.916L15.6348 323.414L13.9263 321.634L12.2178 323.414L11.7195 322.916L13.428 321.136L11.7195 319.356L12.2178 318.858L13.9263 320.638V320.638Z"
    fill="${getStyleColor(theme, 'error', '#fff')}" />
  <text id="error-count" font-size="10" fill="${getStyleColor(theme, 'text', '#fff')}">
    <tspan x="21.9787" y="325">0</tspan>
  </text>

  <path id="warn-icon" fill-rule="evenodd" clip-rule="evenodd"
    d="M37.0462 316H37.7231L42.7538 325.431L42.4154 326H32.3385L32 325.431L37.0462 316ZM37.3846 316.985L32.9846 325.231H41.7692L37.3846 316.985ZM37.8654 324.462V323.692H36.9038V324.462H37.8654ZM36.9038 322.923V319.846H37.8654V322.923H36.9038Z"
    fill="${getStyleColor(theme, 'warning', '#fff')}" />
  <text id="warn-count" font-size="10" fill="${getStyleColor(theme, 'text', '#fff')}">
    <tspan x="46.1748" y="325">0</tspan>
  </text>

  <text id="file-type" x="100%" y="324" transform="translate(-9, 0)" text-anchor="end" font-size="10" fill="#FFFFFF">
    JavaScript
  </text>

  <text fill="${getStyleColor(theme, 'text', '#fff')}" font-size="12.5" font-family="'SFMono-Regular',Consolas,'Liberation Mono',Menlo,Courier,monospace">
    <tspan x="10" y="50" dy="12.5">
      <tspan ${getSyntaxStyles(theme, 'keyword', 'orchid')}>const</tspan><tspan ${getSyntaxStyles(theme, 'variable', 'orange')}>&#160;btn&#160;</tspan><tspan ${getSyntaxStyles(theme, 'operator', 'steelblue')}>=</tspan><tspan ${getSyntaxStyles(theme, 'variable', 'orange')}>&#160;document</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.delimiter', 'white')}>.</tspan><tspan ${getSyntaxStyles(theme, 'property', 'steelblue')}>getElementById</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.bracket', 'white')}>(</tspan><tspan ${getSyntaxStyles(theme, 'string', 'green')}>&apos;btn&apos;</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.bracket', 'white')}>)</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.delimiter', 'white')}>;</tspan>
    </tspan>
    <tspan x="10" y="67" dy="12.5">
      <tspan ${getSyntaxStyles(theme, 'keyword', 'orchid')}>let</tspan><tspan ${getSyntaxStyles(theme, 'variable', 'orange')}>&#160;count&#160;</tspan><tspan ${getSyntaxStyles(theme, 'operator', 'steelblue')}>=</tspan><tspan>&#160;</tspan><tspan ${getSyntaxStyles(theme, 'number', 'cyan')}>0</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.delimiter', 'white')}>;</tspan>
    </tspan>
    <tspan x="10" y="86" dy="12.5">&#160;</tspan>
    <tspan x="10" y="101" dy="12.5">
      <tspan ${getSyntaxStyles(theme, 'keyword', 'orchid')}>function</tspan><tspan>&#160;</tspan><tspan ${getSyntaxStyles(theme, 'function.method', 'orange')}>render</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.delimiter', 'white')}>()&#160;{</tspan>
    </tspan>
    <tspan x="10" y="118" dy="12.5">
      <tspan ${getSyntaxStyles(theme, 'variable', 'orange')}>&#160;&#160;btn</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.delimiter', 'white')}>.</tspan><tspan ${getSyntaxStyles(theme, 'property', 'steelblue')}>innerText</tspan><tspan>&#160;</tspan><tspan ${getSyntaxStyles(theme, 'operator', 'steelblue')}>=</tspan><tspan>&#160;</tspan><tspan ${getSyntaxStyles(theme, 'string', 'green')}>&#96;Count:&#160;</tspan ><tspan ${getSyntaxStyles(theme, 'punctuation.special', 'white')}>&#36;{</tspan><tspan ${getSyntaxStyles(theme, 'variable', 'orange')}>count</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.special', 'white')}>}</tspan><tspan ${getSyntaxStyles(theme, 'string', 'green')}>&#96;</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.delimiter', 'white')}>;</tspan>
    </tspan >
    <tspan x="10" y="135" dy="12.5">
      <tspan ${getSyntaxStyles(theme, 'punctuation.bracket', 'white')}>}</tspan>
    </tspan>
    <tspan x="10" y="160" dy="12.5">&#160;</tspan>
    <tspan x="10" y="169" dy="12.5">
      <tspan ${getSyntaxStyles(theme, 'variable', 'orange')}>btn</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.delimiter', 'white')}>.</tspan><tspan ${getSyntaxStyles(theme, 'property', 'steelblue')}>addEventListener</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.bracket', 'white')}>(</tspan><tspan ${getSyntaxStyles(theme, 'string', 'green')}>&apos;click&apos;</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.bracket', 'white')}>,&#160;()&#160;</tspan><tspan ${getSyntaxStyles(theme, 'operator', 'steelblue')}>=&gt;</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.bracket', 'white')}>&#160;{</tspan>
    </tspan>
    <tspan x="10" y="186" dy="12.5">
      <tspan>&#160;&#160;</tspan><tspan ${getSyntaxStyles(theme, 'comment', 'grey')}>//&#160;Count&#160;from&#160;1&#160;to&#160;10.</tspan>
    </tspan>
    <tspan x="10" y="203" dy="12.5">
      <tspan>&#160;&#160;</tspan><tspan ${getSyntaxStyles(theme, 'keyword', 'orchid')}>if</tspan><tspan>&#160;</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.bracket', 'white')}>(</tspan><tspan ${getSyntaxStyles(theme, 'variable', 'orange')}>count</tspan><tspan>&#160;</tspan><tspan ${getSyntaxStyles(theme, 'operator', 'steelblue')}>&lt;</tspan><tspan>&#160;</tspan><tspan ${getSyntaxStyles(theme, 'number', 'cyan')}>10</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.bracket', 'white')}>)&#160;{</tspan>
    </tspan>
    <tspan x="10" y="220" dy="12.5">
      <tspan>&#160;&#160;&#160;&#160;</tspan><tspan ${getSyntaxStyles(theme, 'variable', 'orange')}>count</tspan><tspan>&#160;</tspan><tspan ${getSyntaxStyles(theme, 'operator', 'steelblue')}>+=</tspan><tspan>&#160;</tspan><tspan ${getSyntaxStyles(theme, 'number', 'cyan')}>1</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.delimiter', 'white')}>;</tspan>
    </tspan>
    <tspan x="10" y="237" dy="12.5">
      <tspan>&#160;&#160;&#160;&#160;</tspan><tspan ${getSyntaxStyles(theme, 'function.method', 'orange')}>render</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.bracket', 'white')}>()</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.delimiter', 'white')}>;</tspan>
    </tspan>
    <tspan x="10" y="254" dy="12.5">
      <tspan>&#160;&#160;</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.bracket', 'white')}>}</tspan>
    </tspan>
    <tspan x="10" y="271" dy="12.5">
      <tspan ${getSyntaxStyles(theme, 'punctuation.bracket', 'white')}>})</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.delimiter', 'white')}>;</tspan>
    </tspan>
  </text>
</svg>`.trim();
}

function getStyleColor(theme: ThemeContent | undefined, style: keyof ThemeContent['style'], fallback: string) {
  return theme?.style?.[style] ?? fallback;
}

function getSyntaxStyles(theme: ThemeContent | undefined, syntax: SyntaxTokens, d: string) {
  const styles = theme?.style?.syntax;
  const fallback = syntax.split('.').shift() as SyntaxTokens;
  const color = styles?.[syntax]?.color ?? styles?.[fallback]?.color ?? d;
  const style = styles?.[syntax]?.font_style ?? styles?.[fallback]?.font_style;
  const weight = styles?.[syntax]?.font_weight ?? styles?.[fallback]?.font_weight;

  // need to fallback if the token is function.method use function and all esle use fllback
  const fill = `fill="${color}"`;
  const fontStyle = style ? `font-style="${style}"` : '';
  const fontWeight = weight ? `font-weight="${weight}"` : '';
  return [fill, fontStyle, fontWeight].join(' ').trim();
}

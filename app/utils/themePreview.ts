import type { SyntaxTokens } from '~/providers/tokens.js';
import type { ThemeContent } from '../themeFamily.js';

/**
 * Renders a theme preview as a standalone SVG document. Every theme string is
 * treated as untrusted data: text and attribute values are XML-escaped and
 * absent values omit their attribute, so output is always well-formed SVG.
 */
export function renderThemePreview(theme: ThemeContent): string {
  return `<svg viewBox="0 0 460 330" xmlns="http://www.w3.org/2000/svg" ${attr('color', theme.style?.text ?? (theme.appearance === 'dark' ? '#CCCCCC' : '#21201C'))} font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif">

  <rect id="code" width="460" height="330" rx="8" ${attr('fill', getStyleColor(theme, 'editor.background'))} />

  <rect id="tab" x="0" y="20" width="460" height="20" ${attr('fill', getStyleColor(theme, 'tab_bar.background'))} />

  <svg x="0" y="20" width="116" height="20">
    <rect id="active-tab" x="0" y="0" width="116" height="20" ${attr('fill', getStyleColor(theme, 'tab.active_background'))} />
    <text id="active-tab-text" x="50px" y="10px" text-anchor="middle" dominant-baseline="middle" ${attr('fill', getStyleColor(theme, 'text'))} font-size="11">
      <tspan>main.js</tspan>
    </text>
  </svg>

  <path id="header" d="M0 8C0 3.58172 3.58172 0 8 0H452C456.418 0 460 3.58172 460 8V20H0V8Z" ${attr('fill', getStyleColor(theme, 'title_bar.background'))} />
  <circle cx="11" cy="10" r="4" fill="grey" />
  <circle cx="27" cy="10" r="4" fill="grey" />
  <circle cx="44" cy="10" r="4" fill="grey" />
  <text id="project-name" x="70px" y="14" ${attr('fill', getStyleColor(theme, 'text'))} font-size="11">${escapeXml(theme.name ?? 'zed')}</text>

  <path id="status" d="M0 311H460V323C460 327.418 456.418 331 452 331H8.00001C3.58173 331 0 327.418 0 323V311Z" ${attr('fill', getStyleColor(theme, 'status_bar.background'))} />

  <path id="error-icon" fill-rule="evenodd" clip-rule="evenodd"
    d="M14.4246 316.011C15.5636 316.082 16.6314 316.651 17.4145 317.434C18.3399 318.431 18.8382 319.641 18.8382 321.065C18.8382 322.204 18.4111 323.272 17.6992 324.197C16.9873 325.051 15.9907 325.692 14.8517 325.906C13.7127 326.119 12.5737 325.977 11.5771 325.407C10.5805 324.838 9.7974 323.984 9.37027 322.916C8.94315 321.848 8.87196 320.638 9.2279 319.57C9.58384 318.431 10.2245 317.506 11.2211 316.865C12.1466 316.224 13.2856 315.939 14.4246 316.011ZM14.7805 325.194C15.706 324.98 16.5602 324.482 17.2009 323.699C17.7704 322.916 18.1263 321.99 18.0551 320.994C18.0551 319.855 17.628 318.716 16.845 317.933C16.1331 317.221 15.2788 316.794 14.2822 316.723C13.3568 316.651 12.3601 316.865 11.5771 317.434C10.794 318.004 10.2245 318.787 9.93977 319.784C9.65502 320.709 9.65502 321.706 10.0821 322.631C10.5093 323.557 11.15 324.268 12.0042 324.767C12.8585 325.265 13.8551 325.407 14.7805 325.194V325.194ZM13.9263 320.638L15.6348 318.858L16.1331 319.356L14.4246 321.136L16.1331 322.916L15.6348 323.414L13.9263 321.634L12.2178 323.414L11.7195 322.916L13.428 321.136L11.7195 319.356L12.2178 318.858L13.9263 320.638V320.638Z"
    ${attr('fill', getStyleColor(theme, 'error'))} />
  <text id="error-count" font-size="10" ${attr('fill', getStyleColor(theme, 'text'))}>
    <tspan x="21.9787" y="325">0</tspan>
  </text>

  <path id="warn-icon" fill-rule="evenodd" clip-rule="evenodd"
    d="M37.0462 316H37.7231L42.7538 325.431L42.4154 326H32.3385L32 325.431L37.0462 316ZM37.3846 316.985L32.9846 325.231H41.7692L37.3846 316.985ZM37.8654 324.462V323.692H36.9038V324.462H37.8654ZM36.9038 322.923V319.846H37.8654V322.923H36.9038Z"
    ${attr('fill', getStyleColor(theme, 'warning'))} />
  <text id="warn-count" font-size="10" ${attr('fill', getStyleColor(theme, 'text'))}>
    <tspan x="46.1748" y="325">0</tspan>
  </text>

  <text id="file-type" x="100%" y="324" transform="translate(-9, 0)" text-anchor="end" font-size="10" fill="#FFFFFF">
    JavaScript
  </text>

  <text ${attr('fill', getStyleColor(theme, 'text'))} font-size="12.5" font-family="'Roboto Mono','Source Code Pro',monospace">
    <tspan x="10" y="50" dy="12.5">
      <tspan ${getSyntaxStyles(theme, 'keyword')}>const</tspan><tspan ${getSyntaxStyles(theme, 'variable')}>&#160;btn&#160;</tspan><tspan ${getSyntaxStyles(theme, 'operator')}>=</tspan><tspan ${getSyntaxStyles(theme, 'variable')}>&#160;document</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.delimiter')}>.</tspan><tspan ${getSyntaxStyles(theme, 'property')}>getElementById</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.bracket')}>(</tspan><tspan ${getSyntaxStyles(theme, 'string')}>&apos;btn&apos;</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.bracket')}>)</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.delimiter')}>;</tspan>
    </tspan>
    <tspan x="10" y="67" dy="12.5">
      <tspan ${getSyntaxStyles(theme, 'keyword')}>let</tspan><tspan ${getSyntaxStyles(theme, 'variable')}>&#160;count&#160;</tspan><tspan ${getSyntaxStyles(theme, 'operator')}>=</tspan><tspan>&#160;</tspan><tspan ${getSyntaxStyles(theme, 'number')}>0</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.delimiter')}>;</tspan>
    </tspan>
    <tspan x="10" y="86" dy="12.5">&#160;</tspan>
    <tspan x="10" y="101" dy="12.5">
      <tspan ${getSyntaxStyles(theme, 'keyword')}>function</tspan><tspan>&#160;</tspan><tspan ${getSyntaxStyles(theme, 'function.method')}>render</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.delimiter')}>()&#160;{</tspan>
    </tspan>
    <tspan x="10" y="118" dy="12.5">
      <tspan ${getSyntaxStyles(theme, 'variable')}>&#160;&#160;btn</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.delimiter')}>.</tspan><tspan ${getSyntaxStyles(theme, 'property')}>innerText</tspan><tspan>&#160;</tspan><tspan ${getSyntaxStyles(theme, 'operator')}>=</tspan><tspan>&#160;</tspan><tspan ${getSyntaxStyles(theme, 'string')}>&#96;Count:&#160;</tspan ><tspan ${getSyntaxStyles(theme, 'punctuation.special')}>&#36;{</tspan><tspan ${getSyntaxStyles(theme, 'variable')}>count</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.special')}>}</tspan><tspan ${getSyntaxStyles(theme, 'string')}>&#96;</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.delimiter')}>;</tspan>
    </tspan >
    <tspan x="10" y="135" dy="12.5">
      <tspan ${getSyntaxStyles(theme, 'punctuation.bracket')}>}</tspan>
    </tspan>
    <tspan x="10" y="160" dy="12.5">&#160;</tspan>
    <tspan x="10" y="169" dy="12.5">
      <tspan ${getSyntaxStyles(theme, 'variable')}>btn</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.delimiter')}>.</tspan><tspan ${getSyntaxStyles(theme, 'property')}>addEventListener</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.bracket')}>(</tspan><tspan ${getSyntaxStyles(theme, 'string')}>&apos;click&apos;</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.bracket')}>,&#160;()&#160;</tspan><tspan ${getSyntaxStyles(theme, 'operator')}>=&gt;</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.bracket')}>&#160;{</tspan>
    </tspan>
    <tspan x="10" y="186" dy="12.5">
      <tspan>&#160;&#160;</tspan><tspan ${getSyntaxStyles(theme, 'comment')}>//&#160;Count&#160;from&#160;1&#160;to&#160;10.</tspan>
    </tspan>
    <tspan x="10" y="203" dy="12.5">
      <tspan>&#160;&#160;</tspan><tspan ${getSyntaxStyles(theme, 'keyword')}>if</tspan><tspan>&#160;</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.bracket')}>(</tspan><tspan ${getSyntaxStyles(theme, 'variable')}>count</tspan><tspan>&#160;</tspan><tspan ${getSyntaxStyles(theme, 'operator')}>&lt;</tspan><tspan>&#160;</tspan><tspan ${getSyntaxStyles(theme, 'number')}>10</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.bracket')}>)&#160;{</tspan>
    </tspan>
    <tspan x="10" y="220" dy="12.5">
      <tspan>&#160;&#160;&#160;&#160;</tspan><tspan ${getSyntaxStyles(theme, 'variable')}>count</tspan><tspan>&#160;</tspan><tspan ${getSyntaxStyles(theme, 'operator')}>+=</tspan><tspan>&#160;</tspan><tspan ${getSyntaxStyles(theme, 'number')}>1</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.delimiter')}>;</tspan>
    </tspan>
    <tspan x="10" y="237" dy="12.5">
      <tspan>&#160;&#160;&#160;&#160;</tspan><tspan ${getSyntaxStyles(theme, 'function.method')}>render</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.bracket')}>()</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.delimiter')}>;</tspan>
    </tspan>
    <tspan x="10" y="254" dy="12.5">
      <tspan>&#160;&#160;</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.bracket')}>}</tspan>
    </tspan>
    <tspan x="10" y="271" dy="12.5">
      <tspan ${getSyntaxStyles(theme, 'punctuation.bracket')}>})</tspan><tspan ${getSyntaxStyles(theme, 'punctuation.delimiter')}>;</tspan>
    </tspan>
  </text>
</svg>`.trim();
}

function getStyleColor(theme: ThemeContent, style: keyof ThemeContent['style']) {
  return theme.style?.[style];
}

function getSyntaxStyles(theme: ThemeContent, syntax: SyntaxTokens) {
  const styles = theme.style?.syntax;
  const fallback = syntax.split('.').shift() as SyntaxTokens;
  const color = styles?.[syntax]?.color ?? styles?.[fallback]?.color;
  const style = styles?.[syntax]?.font_style ?? styles?.[fallback]?.font_style;
  const weight = styles?.[syntax]?.font_weight ?? styles?.[fallback]?.font_weight;

  return [attr('fill', color), attr('font-style', style), attr('font-weight', weight)].filter(Boolean).join(' ');
}

function attr(name: string, value: unknown) {
  if (value === null || value === undefined || value === '') return '';
  return `${name}="${escapeXml(value)}"`;
}

// Characters outside the XML 1.0 Char production (control chars, lone surrogates) cannot be escaped, only dropped.
const INVALID_XML_CHARS = /[^\t\n\r\x20-\u{D7FF}\u{E000}-\u{FFFD}\u{10000}-\u{10FFFF}]/gu;

const XML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;',
};

export function escapeXml(value: unknown) {
  return String(value)
    .replace(INVALID_XML_CHARS, '')
    .replace(/[&<>"']/g, (char) => XML_ENTITIES[char] ?? char);
}

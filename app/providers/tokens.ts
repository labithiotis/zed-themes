import { PlayerColorContent, ThemeStyleContent } from '../themeFamily';

export type StyleTokens = keyof Omit<ThemeStyleContent, 'syntax' | 'players'>;
export type SyntaxTokens = (typeof syntaxTokens)[number];

export const ignoredTokens = ['syntax', 'players', 'background.appearance'];

export const borderTokens: StyleTokens[] = [
  'border',
  'border.variant',
  'border.focused',
  'border.selected',
  'border.transparent',
  'border.disabled',
];

export const elementTokens: StyleTokens[] = [
  'element.background',
  'element.hover',
  'element.active',
  'element.selected',
  'element.disabled',
];

export const ghostElementTokens: StyleTokens[] = [
  'ghost_element.background',
  'ghost_element.hover',
  'ghost_element.active',
  'ghost_element.selected',
  'ghost_element.disabled',
];

export const textTokens: StyleTokens[] = ['text', 'text.muted', 'text.placeholder', 'text.disabled', 'text.accent'];

export const iconTokens: StyleTokens[] = ['icon', 'icon.muted', 'icon.disabled', 'icon.placeholder', 'icon.accent'];

export const scrollbarTokens: StyleTokens[] = [
  'scrollbar_thumb.background',
  'scrollbar.thumb.hover_background',
  'scrollbar.thumb.border',
  'scrollbar.track.background',
  'scrollbar.track.border',
];

export const terminalTokens: StyleTokens[] = [
  'terminal.background',
  'terminal.foreground',
  'terminal.bright_foreground',
  'terminal.dim_foreground',
  'terminal.ansi.black',
  'terminal.ansi.bright_black',
  'terminal.ansi.dim_black',
  'terminal.ansi.red',
  'terminal.ansi.bright_red',
  'terminal.ansi.dim_red',
  'terminal.ansi.green',
  'terminal.ansi.bright_green',
  'terminal.ansi.dim_green',
  'terminal.ansi.yellow',
  'terminal.ansi.bright_yellow',
  'terminal.ansi.dim_yellow',
  'terminal.ansi.blue',
  'terminal.ansi.bright_blue',
  'terminal.ansi.dim_blue',
  'terminal.ansi.magenta',
  'terminal.ansi.bright_magenta',
  'terminal.ansi.dim_magenta',
  'terminal.ansi.cyan',
  'terminal.ansi.bright_cyan',
  'terminal.ansi.dim_cyan',
  'terminal.ansi.white',
  'terminal.ansi.bright_white',
  'terminal.ansi.dim_white',
];

export const editorTokens: StyleTokens[] = [
  'background',
  'background.appearance',
  'editor.foreground',
  'editor.background',
  'editor.gutter.background',
  'editor.subheader.background',
  'editor.active_line.background',
  'editor.highlighted_line.background',
  'editor.line_number',
  'editor.active_line_number',
  'editor.invisible',
  'editor.wrap_guide',
  'editor.active_wrap_guide',
  'editor.document_highlight.read_background',
  'editor.document_highlight.write_background',
  'elevated_surface.background',
  'surface.background',
  'drop_target.background',
  'status_bar.background',
  'title_bar.background',
  'toolbar.background',
  'tab_bar.background',
  'tab.inactive_background',
  'tab.active_background',
  'search.match_background',
  'panel.background',
  'panel.focused_border',
  'pane.focused_border',
];

export const colorTokens: StyleTokens[] = [
  'error',
  'error.background',
  'error.border',
  'hint',
  'hint.background',
  'hint.border',
  'info',
  'info.background',
  'info.border',
  'predictive',
  'predictive.background',
  'predictive.border',
  'renamed',
  'renamed.background',
  'renamed.border',
  'success',
  'success.background',
  'success.border',
  'unreachable',
  'unreachable.background',
  'unreachable.border',
  'warning',
  'warning.background',
  'warning.border',
  'link_text.hover',
];

export const gitTokens: StyleTokens[] = [
  'created',
  'created.background',
  'created.border',
  'conflict',
  'conflict.background',
  'conflict.border',
  'deleted',
  'deleted.background',
  'deleted.border',
  'hidden',
  'hidden.background',
  'hidden.border',
  'ignored',
  'ignored.background',
  'ignored.border',
  'modified',
  'modified.background',
  'modified.border',
];

export const miscTokens: StyleTokens[] = [];

export const syntaxTokens = [
  'attribute',
  'boolean',
  'comment',
  'comment.doc',
  'constant',
  'constructor',
  'embedded',
  'emphasis',
  'emphasis.strong',
  'enum',
  'function',
  'function.method',
  'function.special.definition',
  'hint',
  'keyword',
  'label',
  'link_text',
  'link_uri',
  'number',
  'operator',
  'predictive',
  'preproc',
  'primary',
  'property',
  'punctuation',
  'punctuation.bracket',
  'punctuation.delimiter',
  'punctuation.list_marker',
  'punctuation.special',
  'string',
  'string.escape',
  'string.regex',
  'string.special',
  'string.special.symbol',
  'tag',
  'text.literal',
  'title',
  'type',
  'variable',
  'variable.special',
  'variant',
] as const;

export const playerTokens = ['background', 'cursor', 'selection'] as (keyof PlayerColorContent)[];

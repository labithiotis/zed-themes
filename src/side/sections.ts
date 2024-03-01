import themeSchema from '../state/themeFamily.json';
import {
  StyleTokens,
  borderTokens,
  editorTokens,
  elementTokens,
  ghostElementTokens,
  iconTokens,
  miscTokens,
  scrollbarTokens,
  terminalTokens,
  textTokens,
} from '../state/tokens.ts';

const tokens = Object.entries(
  themeSchema.definitions.ThemeStyleContent.properties
).sort();

type TokenInfo = {
  name: string;
  token: StyleTokens;
  description: string | null;
};

const sectionGroups: Record<
  string,
  { name: string; tokenKeys: string[]; tokens: TokenInfo[] }
> = {
  editor: {
    name: 'Editor',
    tokenKeys: editorTokens,
    tokens: [],
  },
  text: {
    name: 'Text',
    tokenKeys: textTokens,
    tokens: [],
  },
  border: {
    name: 'Borders',
    tokenKeys: borderTokens,
    tokens: [],
  },
  elements: {
    name: 'Elements',
    tokenKeys: elementTokens,
    tokens: [],
  },
  ghostElements: {
    name: 'Ghost Elements',
    tokenKeys: ghostElementTokens,
    tokens: [],
  },
  icons: {
    name: 'Icons',
    tokenKeys: iconTokens,
    tokens: [],
  },
  scrollBar: {
    name: 'Scrollbar',
    tokenKeys: scrollbarTokens,
    tokens: [],
  },
  terminal: {
    name: 'Terminal',
    tokenKeys: terminalTokens,
    tokens: [],
  },
  misc: {
    name: 'Misc',
    tokenKeys: miscTokens,
    tokens: [],
  },
};

for (const [token, info] of tokens) {
  // skip syntax and players tokens as they are handled separately
  if (token === 'syntax' || token === 'players') continue;

  let target = sectionGroups.misc;
  if (sectionGroups.editor.tokenKeys.includes(token)) {
    target = sectionGroups.editor;
  }
  if (sectionGroups.text.tokenKeys.includes(token)) {
    target = sectionGroups.text;
  }
  if (sectionGroups.border.tokenKeys.includes(token)) {
    target = sectionGroups.border;
  }
  if (sectionGroups.elements.tokenKeys.includes(token)) {
    target = sectionGroups.elements;
  }
  if (sectionGroups.ghostElements.tokenKeys.includes(token)) {
    target = sectionGroups.ghostElements;
  }
  if (sectionGroups.icons.tokenKeys.includes(token)) {
    target = sectionGroups.icons;
  }
  if (sectionGroups.scrollBar.tokenKeys.includes(token)) {
    target = sectionGroups.scrollBar;
  }
  if (sectionGroups.terminal.tokenKeys.includes(token)) {
    target = sectionGroups.terminal;
  }
  target.tokens.push({
    token: token as StyleTokens,
    name: token,
    description: 'description' in info ? info.description : null,
  });
}

export const sections = Object.values(sectionGroups);

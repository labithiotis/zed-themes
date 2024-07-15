import themeSchema from '../../../dev/themeFamily.json';
import {
  type StyleTokens,
  borderTokens,
  colorTokens,
  editorTokens,
  elementTokens,
  ghostElementTokens,
  gitTokens,
  iconTokens,
  ignoredTokens,
  miscTokens,
  scrollbarTokens,
  terminalTokens,
  textTokens,
} from '../../providers/tokens';

const tokens = Object.entries(themeSchema.definitions.ThemeStyleContent.properties).sort();

type TokenInfo = {
  name: string;
  token: StyleTokens;
  description: string | null;
};

const sectionGroups: Record<string, { name: string; tokenKeys: string[]; tokens: TokenInfo[] }> = {
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
  color: {
    name: 'Color',
    tokenKeys: colorTokens,
    tokens: [],
  },
  git: {
    name: 'Git',
    tokenKeys: gitTokens,
    tokens: [],
  },
  misc: {
    name: 'Misc',
    tokenKeys: miscTokens,
    tokens: [],
  },
};

for (const [token, info] of tokens) {
  // skip ignored tokens as they are handled separately
  if (ignoredTokens.includes(token)) continue;

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
  if (sectionGroups.color.tokenKeys.includes(token)) {
    target = sectionGroups.color;
  }
  if (sectionGroups.git.tokenKeys.includes(token)) {
    target = sectionGroups.git;
  }
  target.tokens.push({
    token: token as StyleTokens,
    name: token,
    description: 'description' in info ? info.description : null,
  });
}

export const sections = Object.values(sectionGroups);

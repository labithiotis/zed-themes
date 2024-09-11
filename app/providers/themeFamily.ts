import type { ThemeFamilyContent } from '~/themeFamily';
import { type PartialRecursive, merge } from '~/utils/helpers';

export function createThemeFamily(theme?: PartialRecursive<ThemeFamilyContent>): ThemeFamilyContent {
  return merge(
    {
      name: 'default',
      author: '',
      themes: [
        {
          name: 'default',
          appearance: 'light',
          style: {
            background: '#7e7e7e',
            syntax: {},
            players: [],
          },
        },
      ],
    } satisfies ThemeFamilyContent,
    theme,
  );
}

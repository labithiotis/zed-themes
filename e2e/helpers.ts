import seedThemes from '../dev/dbSeedThemes.json' assert { type: 'json' };

export function getTestTheme() {
  const firstTheme = seedThemes[0];
  if (!firstTheme) {
    throw new Error('No test theme found');
  }
  return firstTheme;
}

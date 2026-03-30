export const zedThemeInstallPaths = {
  linux: '~/.config/zed/themes',
  mac: '~/.config/zed/themes',
  windows: '%USERPROFILE%\\AppData\\Roaming\\Zed\\themes\\',
} as const;

export type ZedMachine = keyof typeof zedThemeInstallPaths;
type NavigatorWithUserAgentData = Navigator & {
  userAgentData?: {
    platform?: string;
  };
};

export function getZedMachine(): ZedMachine {
  if (typeof navigator === 'undefined') {
    return 'mac';
  }

  const browserNavigator = navigator as NavigatorWithUserAgentData;
  const platform = (
    browserNavigator.userAgentData?.platform ??
    browserNavigator.platform ??
    browserNavigator.userAgent ??
    ''
  ).toLowerCase();

  if (platform.includes('win')) {
    return 'windows';
  }

  if (platform.includes('linux') || platform.includes('x11')) {
    return 'linux';
  }

  return 'mac';
}

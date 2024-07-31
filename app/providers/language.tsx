import { useFetcher } from '@remix-run/react';
import type React from 'react';
import { type ReactNode, createContext, useCallback, useContext, useState } from 'react';
import type FileIcon from '~/assets/icons/file_icons/file.svg?react';
import { csharpPack } from '~/language_packs/csharp_pack';
import { tsxPack } from '~/language_packs/tsx_pack';

export const languages = {
  tsx: 'TSX',
  csharp: 'C#',
};
export const languagePacks: Record<Language, LanguagePack> = {
  tsx: tsxPack,
  csharp: csharpPack,
};

export type Language = keyof typeof languages;
export type LanguagePack = {
  activeRow: number;
  tabs: [string, string, string];
  breadcrumbs: ReactNode[];
  files: FileItem[];
  lines: ReactNode[];
};

type FileItem = {
  Icon: typeof FileIcon;
  name: string;
  indent: number;
  selected?: boolean;
};

const languageCtx = createContext<{
  language: Language;
  setLanguage(theme: Language): void;
}>({
  language: 'tsx',
  setLanguage: () => console.warn('Calling setLanguage provider beofre it is initialized!'),
});

export const useLanguage = () => useContext(languageCtx);

function usePersistLanguage() {
  const fetcher = useFetcher<{ language: Language }>({
    key: 'language',
  });

  return (language: Language) => {
    fetcher.submit({ language }, { action: '/action/language', method: 'post' });
  };
}

export const LanguageProvider = (props: React.PropsWithChildren<{ language?: Language }>) => {
  const persistLanguage = usePersistLanguage();
  const [language, setLanguage] = useState<Language>(props.language ?? 'tsx');

  const languageHandler = useCallback(
    (language: Language) => {
      setLanguage(language);
      persistLanguage(language);
    },
    [persistLanguage],
  );

  return (
    <languageCtx.Provider value={{ language, setLanguage: languageHandler }}>{props.children}</languageCtx.Provider>
  );
};

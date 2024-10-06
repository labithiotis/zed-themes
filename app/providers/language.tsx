import { useFetcher } from '@remix-run/react';
import type React from 'react';
import { type ReactNode, useCallback, useEffect, useRef } from 'react';
import { create } from 'zustand';
import type FileIcon from '~/assets/icons/file_icons/file.svg?react';
import { csharpPack } from '~/languages/csharp';
import { rustPack } from '~/languages/rust';
import { tsxPack } from '~/languages/tsx';

export const languages = {
  csharp: 'C#',
  rust: 'Rust',
  tsx: 'TSX',
};

export const languagePacks: Record<Language, LanguagePack> = {
  rust: rustPack,
  csharp: csharpPack,
  tsx: tsxPack,
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

type LanguageState = {
  language?: Language;
  setLanguage(language: Language): void;
};

export const useLanguage = create<LanguageState>((set) => ({
  language: undefined,
  setLanguage: (language) => set({ language }),
}));

function usePersistLanguage() {
  const fetcher = useFetcher<{ language: Language }>({
    key: 'language',
  });

  return useCallback(
    (language: Language) => {
      fetcher.submit({ language }, { action: '/action/language', method: 'post' });
    },
    [fetcher.submit],
  );
}

export const LanguageProvider = (props: React.PropsWithChildren<{ language?: Language }>) => {
  const loaded = useRef(false);
  const persistLanguage = usePersistLanguage();
  const language = useLanguage((s) => s.language);
  const setLanguage = useLanguage((s) => s.setLanguage);

  useEffect(() => {
    if (!loaded.current && !language && props.language) {
      setLanguage(props.language);
      loaded.current = true;
    }
  }, [language, props.language, setLanguage]);

  useEffect(() => {
    if (language) {
      persistLanguage(language);
    }
  }, [persistLanguage, language]);

  return <>{props.children}</>;
};

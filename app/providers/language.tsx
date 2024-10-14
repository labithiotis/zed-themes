import { useFetcher } from '@remix-run/react';
import type React from 'react';
import { type ReactNode, createContext, useCallback, useContext, useEffect, useRef } from 'react';
import { createStore, useStore } from 'zustand';
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

type LanguageProps = {
  language?: Language;
};

type LanguageState = LanguageProps & {
  setLanguage(language: Language): void;
};

type LanguageStore = ReturnType<typeof createLanguageStore>;

const LanguageContext = createContext<LanguageStore | null>(null);

const createLanguageStore = (initProps?: Partial<LanguageProps>) => {
  const DEFAULT_PROPS: LanguageProps = {
    language: 'tsx',
  };
  return createStore<LanguageState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    setLanguage: (language) => set({ language }),
  }));
};

export function useLanguage<T>(selector: (state: LanguageState) => T): T {
  const store = useContext(LanguageContext);
  if (!store) throw new Error('Missing LanguageContext.Provider in the tree');
  return useStore(store, selector);
}

export function LanguageProvider({ children, ...props }: React.PropsWithChildren<{ language?: Language }>) {
  const storeRef = useRef<LanguageStore>();
  if (!storeRef.current) {
    storeRef.current = createLanguageStore(props);
  }
  return (
    <LanguageContext.Provider value={storeRef.current}>
      <LanguageLoader>{children}</LanguageLoader>
    </LanguageContext.Provider>
  );
}

export const LanguageLoader = (props: React.PropsWithChildren) => {
  const language = useLanguage((s) => s.language);
  const fetcher = useFetcher<{ language: Language }>({
    key: 'language',
  });

  const persistLanguage = useCallback(
    (language: Language) => {
      fetcher.submit({ language }, { action: '/action/language', method: 'post' });
    },
    [fetcher.submit],
  );

  useEffect(() => {
    if (language) {
      persistLanguage(language);
    }
  }, [persistLanguage, language]);

  return <>{props.children}</>;
};

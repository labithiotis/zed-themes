import { type ReactNode, createContext, useCallback, useContext, useState } from 'react';
import type { StyleTokens, SyntaxTokens } from './tokens';

export type HighlightedToken =
  | { type: 'style'; token: StyleTokens }
  | { type: 'syntax'; token: SyntaxTokens }
  | { type: 'player'; index: number; token: string }
  | null;

interface TokenHighlightContextValue {
  highlightedToken: HighlightedToken;
  setHighlightedToken: (token: HighlightedToken) => void;
  clearHighlightedToken: () => void;
}

const TokenHighlightContext = createContext<TokenHighlightContextValue | null>(null);

export function TokenHighlightProvider({ children }: { children: ReactNode }) {
  const [highlightedToken, setHighlightedToken] = useState<HighlightedToken>(null);

  const clearHighlightedToken = useCallback(() => {
    setHighlightedToken(null);
  }, []);

  return (
    <TokenHighlightContext.Provider
      value={{
        highlightedToken,
        setHighlightedToken,
        clearHighlightedToken,
      }}
    >
      {children}
    </TokenHighlightContext.Provider>
  );
}

export function useTokenHighlight() {
  const context = useContext(TokenHighlightContext);
  if (!context) {
    throw new Error('useTokenHighlight must be used within a TokenHighlightProvider');
  }
  return context;
}

export function useIsTokenHighlighted(type: 'style', token: StyleTokens): boolean;
export function useIsTokenHighlighted(type: 'syntax', token: SyntaxTokens): boolean;
export function useIsTokenHighlighted(type: 'player', index: number, token: string): boolean;
export function useIsTokenHighlighted(
  type: 'style' | 'syntax' | 'player',
  tokenOrIndex: StyleTokens | SyntaxTokens | number,
  playerToken?: string,
): boolean {
  const context = useContext(TokenHighlightContext);
  if (!context) return false;

  const { highlightedToken } = context;
  if (!highlightedToken) return false;

  if (type === 'player' && highlightedToken.type === 'player') {
    return highlightedToken.index === tokenOrIndex && highlightedToken.token === playerToken;
  }

  if (highlightedToken.type === type && highlightedToken.type !== 'player') {
    return highlightedToken.token === tokenOrIndex;
  }

  return false;
}

// Helper function to get the CSS custom property name for a token
export function getTokenDataAttribute(token: HighlightedToken): string | null {
  if (!token) return null;

  if (token.type === 'style') {
    return `style.${token.token}`;
  }
  if (token.type === 'syntax') {
    return `syntax.${token.token}`;
  }
  if (token.type === 'player') {
    return `player.${token.index}.${token.token}`;
  }
  return null;
}

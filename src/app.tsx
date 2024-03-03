import { Theme } from './pages/theme/theme.tsx';
import { Themes } from './pages/themes/themes.tsx';

export function App() {
  if (location.pathname.startsWith('/themes')) {
    return <Themes />;
  } else {
    return <Theme />;
  }
}

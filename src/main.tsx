import { effect, signal } from '@preact/signals';
import { render } from 'preact';
import { App } from './app.tsx';
import './index.css';

type UIThemes = 'dark' | 'light';

const userTheme = matchMedia('(prefers-color-scheme: dark)').matches
  ? 'dark'
  : 'light';

export const uiTheme = signal<UIThemes>(localStorage.theme ?? userTheme);

effect(() => {
  if (uiTheme.value === 'dark') {
    localStorage.theme = 'dark';
    document.documentElement.classList.add('dark');
  } else {
    localStorage.theme = 'light';
    document.documentElement.classList.remove('dark');
  }
});

render(<App />, document.getElementById('app')!);

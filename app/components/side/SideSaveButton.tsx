import ExitIcon from '~/assets/icons/exit.svg?react';
import { btnStyles } from './Side';
import { themeFamily } from '~/state/state';

export function SideSaveButton() {
  const saveTheme = () => {
    const fileName = 'schema';
    const json = JSON.stringify(themeFamily.value, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + '.json';
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  return (
    <button className={btnStyles} onClick={saveTheme}>
      <ExitIcon width={16} height={16} />
      Save Theme
    </button>
  );
}

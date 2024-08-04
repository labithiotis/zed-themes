import { RxDownload } from 'react-icons/rx';
import { useTheme } from '~/providers/theme';
import { Button } from '../ui/button';

export function SideDownloadButton() {
  const { themeFamily } = useTheme();
  const downloadTheme = () => {
    const fileName = `${themeFamily?.name ?? 'schema'}.json`;
    const json = JSON.stringify(themeFamily, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  return (
    <Button size="sm" variant="outline" onClick={downloadTheme} className="flex-1 flex gap-1 items-center">
      <RxDownload />
      <span>Download</span>
    </Button>
  );
}

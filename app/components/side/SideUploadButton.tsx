import { ChangeEvent, useRef } from 'react';
import { FileDrop } from 'react-file-drop';
import ExternalIcon from '~/assets/icons/external_link.svg?react';
import { btnStyles } from './Side';
import { themeValidator } from '../../utils/themeValidator';
import { useThemeDispatch } from '~/providers/theme';

export function SideUploadButton() {
  const dispatch = useThemeDispatch();
  const fileDropRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    onFiles(event.currentTarget.files);
  };

  const onFiles = (files: FileList | null) => {
    if (files === null || files.length > 1) {
      alert('Please upload only 1 file');
      return;
    }

    const file = files[0];
    if (file.type !== 'application/json') {
      alert('Please upload a JSON file');
      return;
    }

    file.text().then((text) => {
      const data = JSON.parse(text);
      const isThemeFamily = 'author' in data;
      const themeFamily = isThemeFamily ? data : { name: 'zed', author: 'zed', themes: [data] };

      if (themeValidator(themeFamily)) {
        dispatch({ type: 'set', themeFamily });
      } else {
        console.warn(themeValidator.errors);
        const message = themeValidator.errors?.map((e) => e.message).join('\n');
        alert(`File does not match Zed's theme schema!\n\nWe got the following errors:\n${message}`);
      }
    });

    fileDropRef.current?.classList.add('hidden');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getFrame = () => (typeof window === 'object' ? document : undefined);

  return (
    <>
      <FileDrop
        frame={getFrame()}
        onDrop={onFiles}
        onTargetClick={() => fileInputRef.current?.click()}
        onFrameDragEnter={() => fileDropRef.current?.classList.remove('hidden')}
        onFrameDragLeave={() => fileDropRef.current?.classList.add('hidden')}
      >
        <div
          ref={fileDropRef}
          className="absolute inset-0 isolate z-10 flex hidden select-none items-center justify-center bg-zinc-600/80"
        >
          <h4 className="text-2xl font-bold text-white shadow-black drop-shadow-lg">Drop your schema here</h4>
        </div>
      </FileDrop>
      <input ref={fileInputRef} type="file" accept=".json" className="hidden" multiple={false} onChange={onFileInput} />
      <button onClick={() => fileInputRef.current?.click()} className={btnStyles}>
        <ExternalIcon width={15} height={15} style={{ marginTop: -2 }} />
        Upload existing theme
      </button>
    </>
  );
}

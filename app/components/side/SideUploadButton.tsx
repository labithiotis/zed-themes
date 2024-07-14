import { type ChangeEvent, useRef } from "react";
import { FileDrop } from "react-file-drop";
import { useTheme } from "~/providers/theme";
import { themeValidator } from "../../utils/themeValidator";
import { btnStyles } from "./Side";

export function SideUploadButton() {
  const { dispatch } = useTheme();
  const fileDropRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    onFiles(event.currentTarget.files);
  };

  const onFiles = (files: FileList | null) => {
    if (files === null || files.length > 1) {
      alert("Please upload only 1 file");
      return;
    }

    const file = files[0];
    if (file.type !== "application/json") {
      alert("Please upload a JSON file");
      return;
    }

    file.text().then((text) => {
      const data = JSON.parse(text);
      const isThemeFamily = "author" in data;
      const themeFamily = isThemeFamily ? data : { name: "zed", author: "zed", themes: [data] };

      if (themeValidator(themeFamily)) {
        dispatch({ type: "set", themeFamily });
      } else {
        console.warn(themeValidator.errors);
        const message = themeValidator.errors?.map((e) => e.message).join("\n");
        alert(`File does not match Zed's theme schema!\n\nWe got the following errors:\n${message}`);
      }
    });

    fileDropRef.current?.classList.add("hidden");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <FileDrop
        onDrop={onFiles}
        onTargetClick={() => fileInputRef.current?.click()}
        onFrameDragEnter={() => fileDropRef.current?.classList.remove("hidden")}
        onFrameDragLeave={() => fileDropRef.current?.classList.add("hidden")}
      >
        <div
          ref={fileDropRef}
          className="absolute inset-0 isolate z-10 flex hidden select-none items-center justify-center bg-zinc-600/80"
        >
          <h4 className="text-2xl font-bold text-white shadow-black drop-shadow-lg">Drop your schema here</h4>
        </div>
      </FileDrop>
      <input ref={fileInputRef} type="file" accept=".json" className="hidden" multiple={false} onChange={onFileInput} />
      <button type="button" onClick={() => fileInputRef.current?.click()} className={btnStyles}>
        <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <title>Upload</title>
          <path
            d="M12 15L12 2M12 2L15 5.5M12 2L9 5.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 22.0002H16C18.8284 22.0002 20.2426 22.0002 21.1213 21.1215C22 20.2429 22 18.8286 22 16.0002V15.0002C22 12.1718 22 10.7576 21.1213 9.8789C20.3529 9.11051 19.175 9.01406 17 9.00195M7 9.00195C4.82497 9.01406 3.64706 9.11051 2.87868 9.87889C2 10.7576 2 12.1718 2 15.0002L2 16.0002C2 18.8286 2 20.2429 2.87868 21.1215C3.17848 21.4213 3.54062 21.6188 4 21.749"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <span>Upload theme</span>
      </button>
    </>
  );
}

import { cssVarStyleToken } from "~/utils/cssVarTokens";

export function Header() {
  return (
    <div
      id="editor-header"
      className="flex items-center gap-2 border-b px-2"
      style={{
        borderColor: cssVarStyleToken("border"),
        backgroundColor: cssVarStyleToken("title_bar.background"),
      }}
    >
      <span className="h-[10px] w-[10px] rounded-full" style={{ backgroundColor: "grey" }} />
      <span className="h-[10px] w-[10px] rounded-full" style={{ backgroundColor: "grey" }} />
      <span className="h-[10px] w-[10px] rounded-full" style={{ backgroundColor: "grey" }} />
      <span className="rounded-md p-1 text-sm" style={{ color: cssVarStyleToken("text") }}>
        zed
      </span>
      <span className="rounded-md p-1  text-sm" style={{ color: cssVarStyleToken("text.muted") }}>
        main
      </span>
    </div>
  );
}

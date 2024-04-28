import MonacoEditor from "@monaco-editor/react";
import { useTheme } from "next-themes";

import { Skeleton } from "~/components/ui/skeleton";
import { useDraft } from "~/hooks/use-draft";
import { useMounted } from "~/hooks/use-mounted";

interface EditorProps {
  markdown?: string;
  onChange: (value: string) => void;
}

export function Editor({ markdown, onChange }: EditorProps) {
  const { resolvedTheme } = useTheme();
  const [draft] = useDraft();

  const mounted = useMounted();

  function handleEditorChange(value: string | undefined) {
    onChange(value ?? "");
  }

  return (
    <div className="relative min-h-[400px] w-full">
      {mounted ? (
        <MonacoEditor
          language="markdown"
          value={markdown ?? draft.content}
          theme={resolvedTheme === "dark" ? "vs-dark" : "vs-light"}
          onChange={handleEditorChange}
          options={{
            minimap: {
              enabled: false,
            },
            wordWrap: "on",
            wrappingIndent: "indent",
            scrollBeyondLastLine: false,
            scrollbar: {
              vertical: "hidden",
              horizontal: "hidden",
            },
            lineNumbers: "off",
            overviewRulerLanes: 0,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 0,
            // glyphMargin: false,
            // folding: false,
            renderLineHighlight: "none",
            fontSize: 14,
            padding: {
              top: 12,
              bottom: 650,
            },
            cursorBlinking: "smooth",
            dragAndDrop: true,
          }}
          className="min-h-[400px]"
        />
      ) : (
        <Skeleton className="h-40 w-full" />
      )}
    </div>
  );
}

"use client";

import "~/styles/mdx.css";

import { useCallback, useEffect, useRef, useState } from "react";

import { EditorMenu } from "~/components/editor-menu";
import { Markdown as MDX } from "~/components/mdx/markdown";
import { Skeleton } from "~/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Textarea } from "~/components/ui/textarea";
import { commands, type Commands } from "~/config/editor";
import { useDebounce } from "~/hooks/use-debounce";
import { useMounted } from "~/hooks/use-mounted";

interface EditorProps {
  initialContent?: string;
  setValue: (value: string) => void;
}

export function Editor({ initialContent, setValue }: EditorProps) {
  let content = "";

  if (initialContent) {
    content = initialContent;
  } else {
    if (typeof window === "undefined") {
      content = localStorage.getItem("editor-draft") ?? "";
    }
  }

  const mounted = useMounted();
  const [editorContent, setEditorContent] = useState(content);
  const debouncedContent = useDebounce(editorContent, 5000);
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  const [history, setHistory] = useState<string[]>([editorContent]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [selection, setSelection] = useState<{ start: number; end: number }>();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setValue(editorContent);
    localStorage.setItem("editor-draft", debouncedContent);
  }, [setValue, editorContent, debouncedContent]);

  useEffect(() => {
    if (!selection || !textareaRef.current) return;
    const { start, end } = selection;
    textareaRef.current.setSelectionRange(start, end);
    textareaRef.current.focus();
  }, [selection]);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setEditorContent(history[historyIndex - 1] ?? content);
    }
  }, [history, historyIndex, content]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setEditorContent(history[historyIndex + 1] ?? content);
    }
  }, [history, historyIndex, content]);

  useEffect(() => {
    const handleUndoRedo = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        if (event.key === "z") {
          event.preventDefault();
          handleUndo();
        } else if (event.key === "y") {
          event.preventDefault();
          handleRedo();
        }
      }
    };

    document.addEventListener("keydown", handleUndoRedo);
    return () => {
      document.removeEventListener("keydown", handleUndoRedo);
    };
  }, [handleUndo, handleRedo]);

  const onCommand = useCallback(
    (command: Commands[number]["title"]) => {
      if (textareaRef.current) {
        const selectionStart = textareaRef.current.selectionStart;
        const selectionEnd = textareaRef.current.selectionEnd;

        const selectedText = textareaRef.current.value.substring(
          selectionStart,
          selectionEnd,
        );

        const commandHandler = commands.find((cmd) => cmd.title === command);
        if (!commandHandler) return;

        const newSelectedText = commandHandler.handler(
          !selectedText.length ? undefined : selectedText,
        );

        const newText =
          textareaRef.current.value.substring(0, selectionStart) +
          newSelectedText +
          textareaRef.current.value.substring(selectionEnd);

        setEditorContent(newText);

        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(newText);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);

        const newSelectionStart = selectionStart + newSelectedText.length;
        const newSelectionEnd = selectionStart + newSelectedText.length;

        setSelection({ start: newSelectionStart, end: newSelectionEnd });
      }
    },
    [history, historyIndex],
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newContent = e.target.value;
      setEditorContent(newContent);

      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newContent);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    },
    [history, historyIndex],
  );

  return (
    <Tabs
      defaultValue="write"
      onValueChange={(value) => setSelectedTab(value as "write" | "preview")}
    >
      <div className="flex flex-wrap items-center justify-between">
        <TabsList>
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        {selectedTab === "write" && (
          <EditorMenu
            onCommand={onCommand}
            handleRedo={handleRedo}
            handleUndo={handleUndo}
          />
        )}
      </div>
      <TabsContent value="write">
        {mounted ? (
          <Textarea
            className="min-h-[400px] text-base"
            value={editorContent}
            onChange={onChange}
            ref={textareaRef}
          />
        ) : (
          <Skeleton className="h-[400px] w-full" />
        )}
      </TabsContent>
      <TabsContent value="preview" className="rounded-md border px-3 py-2">
        <div className="prose dark:prose-invert">
          {editorContent.trim() === "" ? (
            "Nothing to preview"
          ) : (
            <MDX source={editorContent} />
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}

"use client";

import "~/styles/mdx.css";

import { useCallback, useEffect, useRef, useState } from "react";
// import Markdown from "react-markdown";
// import rehypeHighlight from "rehype-highlight";
// import remarkBreaks from "remark-breaks";
// import remarkGfm from "remark-gfm";

import { EditorMenu } from "~/components/editor-menu";
import { Markdown as MDX } from "~/components/mdx/markdown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Textarea } from "~/components/ui/textarea";
import { commands, type Commands } from "~/config/editor";

interface EditorProps {
  initialContent?: string;
  setValue: (value: string) => void;
}

export function Editor({ initialContent = "", setValue }: EditorProps) {
  const [editorContent, setEditorContent] = useState(initialContent);
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  const [history, setHistory] = useState<string[]>([editorContent]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [selection, setSelection] = useState<{ start: number; end: number }>();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setValue(editorContent);
  }, [editorContent, setValue]);

  useEffect(() => {
    if (!selection || !textareaRef.current) return;
    const { start, end } = selection;
    textareaRef.current.setSelectionRange(start, end);
    textareaRef.current.focus();
  }, [selection]);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setEditorContent(history[historyIndex - 1] ?? initialContent);
    }
  }, [history, historyIndex, initialContent]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setEditorContent(history[historyIndex + 1] ?? initialContent);
    }
  }, [history, historyIndex, initialContent]);

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

  function onCommand(command: Commands[number]["title"]) {
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
  }

  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const newContent = e.target.value;
    setEditorContent(newContent);

    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newContent);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }

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
        <Textarea
          className="min-h-[400px]"
          value={editorContent}
          onChange={onChange}
          ref={textareaRef}
        />
      </TabsContent>
      <TabsContent value="preview" className="rounded-md border px-3 py-2">
        <div className="prose dark:prose-invert">
          {editorContent.trim() === "" ? (
            "Nothing to preview"
          ) : (
            <MDX source={editorContent} />
            // <Markdown
            //   disallowedElements={["img"]}
            //   remarkPlugins={[remarkGfm, remarkBreaks]}
            //   rehypePlugins={[rehypeHighlight]}
            // >
            //   {editorContent}
            // </Markdown>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}

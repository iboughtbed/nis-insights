"use client";

import "~/styles/mdx.css";

import { useCallback, useEffect, useRef, useState } from "react";

import { EditorMenu } from "~/components/editor-menu";
import { MemoizedReactMarkdown } from "~/components/mdx/markdown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Textarea } from "~/components/ui/textarea";
import { commands, type Commands } from "~/config/editor";

interface EditorProps {
  content?: string;
  onValueChange: (value: string) => void;
}

export default function Editor({ content = "", onValueChange }: EditorProps) {
  const [editorContent, setEditorContent] = useState(content);
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  const [history, setHistory] = useState([editorContent]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [selection, setSelection] = useState<{ start: number; end: number }>();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    onValueChange(editorContent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorContent]);

  useEffect(() => {
    if (!selection || !textareaRef.current) return;
    textareaRef.current.setSelectionRange(selection.start, selection.end);
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

        let newSelectedText = commandHandler.handler(
          !selectedText.length ? undefined : selectedText,
        );

        const isInlineCommand =
          commandHandler.title === "Bold" ||
          commandHandler.title === "Italic" ||
          commandHandler.title === "Code" ||
          commandHandler.title === "Link";

        if (!isInlineCommand) {
          newSelectedText = "\n" + newSelectedText;
        }

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
        <Textarea
          className="min-h-[400px] overflow-x-auto text-base"
          value={editorContent}
          onChange={onChange}
          ref={textareaRef}
        />
      </TabsContent>
      <TabsContent
        value="preview"
        className="h-[400px] overflow-y-scroll rounded-md border px-3 py-2"
      >
        {editorContent.trim() === "" ? (
          "Nothing to preview"
        ) : (
          <MemoizedReactMarkdown>{editorContent}</MemoizedReactMarkdown>
        )}
      </TabsContent>
    </Tabs>
  );
}

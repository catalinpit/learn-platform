import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import YouTube from "@tiptap/extension-youtube";
import { all, createLowlight } from "lowlight";

import ToolBar from "./tool-bar";

const lowlight = createLowlight(all);

const extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3, 4],
    },
    codeBlock: false,
  }),
  CodeBlockLowlight.configure({
    lowlight,
  }),
  YouTube.configure({
    width: 640,
    height: 360,
  }),
];

type TiptapProps = {
  initialValue: string;
  onChange: (value: string) => void;
};

const Tiptap = ({ initialValue, onChange }: TiptapProps) => {
  const editor = useEditor({
    extensions,
    content: initialValue,
    editorProps: {
      attributes: {
        class:
          "rounded-md border min-h-[150px] border-input bg-background focus:ring-offset-2 disabled:cursor-not-allows disabled:opacity-50 p-6 max-w-none prose dark:prose-invert",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <>
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ToolBar from "./tool-bar";

const extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3, 4],
    },
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
          "rounded-md border min-h-[150px] border-input bg-background focus:ring-offset-2 disabled:cursor-not-allows disabled:opacity-50 p-2 prose prose-sm dark:text-white text-black sm:prose-base lg:prose-lg xl:prose-2xl",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col justify-stretch min-h-[250px]">
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;

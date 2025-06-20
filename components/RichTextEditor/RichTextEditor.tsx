"use client";

import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import RichTextMenuBar from "./RichTextMenuBar";
import { Dispatch, SetStateAction } from "react";

type RichTextEditorProps = {
  onChange: Dispatch<SetStateAction<string>>;
  description: string;
};

const RichTextEditor = ({ onChange, description }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-3",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-3",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class:
          " min-h-[350px] max-h-[350px] overflow-scroll border rounded-md bg-slate-50 py-2 px-3  ",
      },
    },
    onUpdate: ({ editor }) => {
      // console.log(editor.getHTML());
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="mt-5">
      <RichTextMenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
export default RichTextEditor;

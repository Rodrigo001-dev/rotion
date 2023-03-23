import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import Document from "@tiptap/extension-document";
import Typography from "@tiptap/extension-typography";

import { EditorContent, useEditor } from "@tiptap/react";

export interface OnContentUpdatedParams {
  title: string;
  content: string;
}

interface EditorProps {
  content: string;
  onContentUpdated: (params: OnContentUpdatedParams) => void;
}

export function Editor({ content, onContentUpdated }: EditorProps) {
  const editor = useEditor({
    extensions: [
      Document.extend({
        // estou dizendo que o meu documento sempre precisa iniciar com um heading
        // o primeiro elemento sempre precisa ser um titulo
        // depois do titulo eu posso ter qualquer coisa(block) quantas vezes forem necessárias(*)
        content: "heading block*",
      }),
      StarterKit.configure({
        document: false,
      }),
      Highlight,
      Typography,
      Placeholder.configure({
        placeholder: "Untitled",
        emptyEditorClass:
          "before:content-[attr(data-placeholder)] before:text-gray-500 before:h-0 before:float-left before:pointer-events-none",
      }),
    ],
    onUpdate: ({ editor }) => {
      const contentRegex = /(<h1>(?<title>.+)<\/h1>(?<content>.+)?)/;
      const parsedContent = editor.getHTML().match(contentRegex)?.groups;

      const title = parsedContent?.title ?? "Untitled";
      const content = parsedContent?.content ?? "";

      onContentUpdated({ title, content });
    },
    content,
    autofocus: "end",
    editorProps: {
      attributes: {
        class: "focus:outline-none prose prose-invert prose-headings:mt-0",
      },
    },
  });

  return <EditorContent className="w-[65ch]" editor={editor} />;
}

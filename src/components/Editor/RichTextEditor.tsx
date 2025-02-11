'use client';

import './editor.css';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import js from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import typescript from 'highlight.js/lib/languages/typescript';
import { useState } from 'react';

const lowlight = createLowlight();
lowlight.register('js', js);
lowlight.register('javascript', js);
lowlight.register('python', python);
lowlight.register('typescript', typescript);

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const [linkUrl, setLinkUrl] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 hover:text-blue-700 underline',
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const addImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        if (data.url) {
          editor.chain().focus().setImage({ src: data.url }).run();
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const addLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl('');
      setShowLinkInput(false);
    }
  };

  return (
    <div className="relative bg-neutral-900 rounded-lg border border-neutral-800">
      <div className="flex flex-wrap gap-2 p-2 border-b border-neutral-800 bg-neutral-900 rounded-t-lg">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            editor.isActive('bold') ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700'
          }`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            editor.isActive('italic') ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700'
          }`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            editor.isActive('heading', { level: 2 }) ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700'
          }`}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            editor.isActive('heading', { level: 3 }) ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700'
          }`}
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            editor.isActive('bulletList') ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700'
          }`}
        >
          Bullet List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            editor.isActive('orderedList') ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700'
          }`}
        >
          Numbered List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            editor.isActive('codeBlock') ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700'
          }`}
        >
          Code Block
        </button>
        <div className="relative">
          {showLinkInput ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="Enter URL"
                className="px-3 py-1.5 rounded-md text-sm bg-neutral-800 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addLink}
                className="px-3 py-1.5 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
              >
                Add
              </button>
              <button
                onClick={() => setShowLinkInput(false)}
                className="px-3 py-1.5 rounded-md text-sm font-medium bg-neutral-800 text-white hover:bg-neutral-700"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowLinkInput(true)}
              className="px-3 py-1.5 rounded-md text-sm font-medium bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
            >
              Link
            </button>
          )}
        </div>
        <label className="px-3 py-1.5 rounded-md text-sm font-medium bg-neutral-800 text-neutral-200 hover:bg-neutral-700 cursor-pointer">
          Image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={addImage}
          />
        </label>
      </div>
      <EditorContent editor={editor} className="prose prose-invert max-w-none p-4" />
    </div>
  );
};

export default RichTextEditor;

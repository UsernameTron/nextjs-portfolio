'use client';

interface TextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function TextEditor({ content, onChange }: TextEditorProps) {
  return (
    <textarea
      className="w-full h-64 p-4 bg-neutral-900 text-white border border-neutral-700 rounded-lg"
      value={content}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Write your content here..."
    />
  );
}

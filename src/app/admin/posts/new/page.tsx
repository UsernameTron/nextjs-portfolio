'use client';

import { useState } from 'react';

type PostType = 'TECHNICAL' | 'EDITORIAL';
type PostStatus = 'DRAFT' | 'PUBLISHED' | 'SCHEDULED';

interface FormData {
  title: string;
  content: string;
  type: PostType;
  status: PostStatus;
  scheduledFor: string;
  bannerImage?: string;
}
import RichTextEditor from '@/components/Editor/RichTextEditor';
import Image from 'next/image';
import type { FC } from 'react';
import { useRouter } from 'next/navigation';

interface PostPreviewProps {
  content: string;
  title: string;
  bannerImage?: string;
}

const PostPreview: FC<PostPreviewProps> = ({ content, title, bannerImage }) => (
  <article className="prose prose-lg prose-invert max-w-none">
    {bannerImage && (
      <div className="relative w-full h-[400px] mb-8">
        <Image
          src={bannerImage}
          alt={title}
          fill
          className="object-cover rounded-lg"
        />
      </div>
    )}
    <h1 className="text-4xl font-bold mb-8">{title}</h1>
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </article>
);

const NewPostPage: FC = () => {
  const router = useRouter();
  const [isPreview, setIsPreview] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    status: 'DRAFT' as const,
    scheduledFor: '',
    type: 'TECHNICAL' as const,
    title: '',
    bannerImage: '',
    content: '',
  });

  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create post');
      }

      console.log('Post created:', data);
      router.push('/admin/posts');
    } catch (err) {
      console.error('Error creating post:', err);
      setError(err instanceof Error ? err.message : 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">Create New Post</h1>
            <button
              type="button"
              onClick={() => setIsPreview(!isPreview)}
              className="px-4 py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors"
            >
              {isPreview ? 'Edit' : 'Preview'}
            </button>
          </div>

          {isPreview ? (
            <PostPreview
              content={formData.content}
              title={formData.title}
              bannerImage={formData.bannerImage}
            />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 mb-4 text-red-500 bg-red-950 border border-red-900 rounded-md">
                  {error}
                </div>
              )}
              {/* Post Type Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Post Type</label>
                <div className="flex gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="TECHNICAL"
                      checked={formData.type === 'TECHNICAL'}
                      onChange={() => setFormData({ ...formData, type: 'TECHNICAL' })}
                      className="form-radio h-4 w-4 text-blue-600 border-neutral-600 bg-neutral-800 focus:ring-blue-500"
                    />
                    <span className="ml-2">Technical</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="EDITORIAL"
                      checked={formData.type === 'EDITORIAL'}
                      onChange={() => setFormData({ ...formData, type: 'EDITORIAL' })}
                      className="form-radio h-4 w-4 text-blue-600 border-neutral-600 bg-neutral-800 focus:ring-blue-500"
                    />
                    <span className="ml-2">Editorial</span>
                  </label>
                </div>
              </div>

              {/* Banner Image Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Banner Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData({ ...formData, bannerImage: reader.result as string });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="block w-full text-sm text-neutral-400
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-neutral-800 file:text-white
                    hover:file:bg-neutral-700"
                />
                {formData.bannerImage && (
                  <div className="relative w-full h-[200px] mt-4">
                    <Image
                      src={formData.bannerImage}
                      alt="Banner preview"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Title Input */}
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="block w-full px-4 py-2 rounded-lg bg-neutral-800 border-transparent text-white placeholder-neutral-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter post title"
                />
              </div>

              {/* Rich Text Editor */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Content</label>
                <div className="prose prose-invert max-w-none">
                  <RichTextEditor
                    content={formData.content}
                    onChange={(content) => setFormData({ ...formData, content })}
                  />
                </div>
              </div>

              {/* Publishing Options */}
              <div className="space-y-4 border-t border-neutral-800 pt-6 mt-8">
                <h3 className="text-xl font-semibold">Publishing Options</h3>
                
                <div className="flex gap-4 items-center">
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'DRAFT' | 'PUBLISHED' | 'SCHEDULED' })}
                    className="px-4 py-2 bg-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500"
                    disabled={isSubmitting}
                  >
                    <option value="DRAFT">Save as Draft</option>
                    <option value="PUBLISHED">Publish Immediately</option>
                    <option value="SCHEDULED">Schedule for Later</option>
                  </select>

                  {formData.status === 'SCHEDULED' && (
                    <input
                      type="datetime-local"
                      value={formData.scheduledFor}
                      onChange={(e) => setFormData({ ...formData, scheduledFor: e.target.value })}
                      className="px-4 py-2 bg-neutral-800 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 text-white rounded-lg transition-colors font-medium ${isSubmitting 
                    ? 'bg-blue-800 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  {isSubmitting 
                    ? 'Saving...' 
                    : (formData.status === 'DRAFT' 
                        ? 'Save Draft' 
                        : formData.status === 'SCHEDULED' 
                          ? 'Schedule Post' 
                          : 'Publish Now')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewPostPage;

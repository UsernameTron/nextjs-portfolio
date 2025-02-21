'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface MediaItem {
  id: string;
  url: string;
  name: string;
  type: string;
}

export default function Media() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Load existing media items on mount
  useEffect(() => {
    const loadExistingMedia = async () => {
      try {
        const response = await fetch('/api/media');
        if (response.ok) {
          const data = await response.json();
          setMediaItems(data.files || []);
        }
      } catch (error) {
        console.error('Error loading media:', error);
      }
    };

    loadExistingMedia();
  }, []);

  const handleFiles = async (files: FileList) => {
    setError(null);
    setIsUploading(true);
    try {
      const formData = new FormData();
      const validFiles = Array.from(files).filter(file => {
        if (!file.type.startsWith('image/')) {
          setError('Only image files are allowed');
          return false;
        }
        if (file.size > 60 * 1024 * 1024) {
          setError('Files must be smaller than 60MB');
          return false;
        }
        return true;
      });

      if (validFiles.length === 0) {
        setIsUploading(false);
        return;
      }

      validFiles.forEach(file => {
        formData.append('files', file);
      });

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      if (data.success && data.files) {
        setMediaItems(prev => [...prev, ...data.files]);
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      setError(error instanceof Error ? error.message : 'Failed to upload files');
    } finally {
      setIsUploading(false);
    }
  };

  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const removeItem = async (id: string) => {
    setError(null);
    setIsDeleting(id);
    try {
      const response = await fetch(`/api/media/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        setMediaItems(prev => prev.filter(item => item.id !== id));
      } else {
        setError(data.error || 'Failed to delete image');
        console.error('Error response:', data);
      }
    } catch (error) {
      setError('Failed to delete image. Please try again.');
      console.error('Error removing item:', error);
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="space-y-8 p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Media Gallery</h1>
        <p className="text-gray-400 mb-8">Upload images to your gallery</p>
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging ? 'border-primary-500 bg-neutral-800/50' : 'border-neutral-700 hover:border-neutral-500'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
      >
        <div className="space-y-4">
          <div className="text-gray-400">
            {isUploading ? (
              <div className="flex items-center justify-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Uploading...</span>
              </div>
            ) : (
              <>
                Drag and drop images here, or
                <label className="mx-2 text-primary-400 hover:text-primary-300 cursor-pointer">
                  browse
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={(e) => e.target.files && handleFiles(e.target.files)}
                  />
                </label>
              </>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-100 px-4 py-2 rounded-lg mb-6 flex items-center justify-between">
          <p>{error}</p>
          <button
            onClick={() => setError(null)}
            className="ml-4 text-red-300 hover:text-red-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mediaItems.map((item) => (
          <div
            key={item.id}
            className="group relative bg-neutral-900 rounded-lg overflow-hidden aspect-square"
          >
            <Image
              src={item.url}
              alt={item.name}
              fill
              className="object-cover"
            />
            <button
              onClick={() => removeItem(item.id)}
              disabled={isDeleting === item.id}
              className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
            >
              {isDeleting === item.id ? (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        ))}
      </div>

      {mediaItems.length === 0 && (
        <div className="text-center text-gray-400 py-8 bg-neutral-900 rounded-lg border border-neutral-800">
          <p>No images uploaded yet. Start by dragging and dropping some images!</p>
        </div>
      )}
    </div>
  );
}

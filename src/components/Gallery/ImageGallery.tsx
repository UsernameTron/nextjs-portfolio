'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface MediaFile {
  filename: string;
  path: string;
  fullPath?: string;
}

export default function ImageGallery() {
  const [images, setImages] = useState<MediaFile[]>([]);
  const [currentSet, setCurrentSet] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const imagesPerSet = 3;
  const rotationInterval = 7000; // Increased to 7 seconds for better viewing

  useEffect(() => {
    setLoading(true);
    fetch('/api/media')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setImages(data.files);
          console.log(`Loaded ${data.files.length} images`);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Gallery Error:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Auto-rotate
  useEffect(() => {
    if (images.length <= imagesPerSet) return;

    const interval = setInterval(() => {
      setCurrentSet(current => 
        current + imagesPerSet >= images.length ? 0 : current + imagesPerSet
      );
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [images.length, imagesPerSet]);

  if (loading) return <div className="text-center p-4">Loading gallery...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  if (images.length === 0) return <div className="text-center p-4">No images found. Please check the uploads folder.</div>;

  const currentImages = images.slice(currentSet, currentSet + imagesPerSet);
  const totalSets = Math.ceil(images.length / imagesPerSet);

  return (
    <div className="space-y-6">
      {/* Twitter/X Link */}
      <div className="flex justify-end">
        <a
          href="https://x.com/connor_pet68383"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-400 hover:text-blue-400 transition-colors"
          title="Follow me on X (Twitter)"
        >
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentImages.map((image, index) => (
          <div
            key={image.path + index}
            className="relative aspect-video overflow-hidden rounded-lg bg-neutral-900/50 group cursor-pointer"
            onClick={() => window.open(image.path, '_blank')}
          >
            <Image
              src={image.path}
              alt={image.filename}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
      
      {totalSets > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalSets }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                Math.floor(currentSet / imagesPerSet) === index 
                  ? 'bg-blue-500 w-4' 
                  : 'bg-gray-400'
              }`}
              onClick={() => setCurrentSet(index * imagesPerSet)}
            />
          ))}
        </div>
      )}
    </div>
  );
} 
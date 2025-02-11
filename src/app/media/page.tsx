'use client';

import { MediaItem } from '@/types';
import ReactPlayer from 'react-player';
import Image from 'next/image';

// Media items from public/media directory
const MEDIA_ITEMS: MediaItem[] = [
  {
    type: 'image',
    title: 'No AI Grift',
    url: '/media/no-bs.png',
    description: 'Zero Tolerance for AI Bullshit'
  }
  // Add more media items here
];

export default function Media() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Media Gallery</h1>
        <p className="text-gray-400">A collection of images and videos exposing AI grifts</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {MEDIA_ITEMS.map((item, index) => (
          <div
            key={index}
            className="bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden hover:border-neutral-700 transition-colors"
          >
            <div className="aspect-video relative">
              {item.type === 'image' ? (
                <Image
                  src={item.url}
                  alt={item.title}
                  width={800}
                  height={600}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="relative w-full h-full">
                  <ReactPlayer
                    url={item.url}
                    width="100%"
                    height="100%"
                    light={item.thumbnailUrl}
                    controls
                    onError={(e) => console.error('Video playback error:', e)}
                  />
                </div>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-white mb-2">{item.title}</h2>
              {item.description && (
                <p className="text-gray-400">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {MEDIA_ITEMS.length === 0 && (
        <div className="text-center text-gray-400 py-8 bg-neutral-900 rounded-lg border border-neutral-800">
          <p>No media items available yet.</p>
        </div>
      )}
    </div>
  );
}

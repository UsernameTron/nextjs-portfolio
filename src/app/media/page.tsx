'use client';

import { MediaItem } from '@/types';
import ReactPlayer from 'react-player';
import Image from 'next/image';

// This would typically come from your CMS or database
const SAMPLE_MEDIA: MediaItem[] = [
  {
    type: 'image',
    title: 'Sample Project Screenshot',
    url: 'https://via.placeholder.com/800x600',
    description: 'A screenshot of one of my recent projects'
  },
  {
    type: 'video',
    title: 'Project Demo',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'A demo of my latest project',
    thumbnailUrl: 'https://via.placeholder.com/800x600'
  }
];

export default function Media() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Media</h1>
        <p className="text-gray-600 mt-2">Images, videos, and presentations from my work</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {SAMPLE_MEDIA.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
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
                <ReactPlayer
                  url={item.url}
                  width="100%"
                  height="100%"
                  light={item.thumbnailUrl}
                  controls
                />
              )}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              {item.description && (
                <p className="text-gray-600">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {SAMPLE_MEDIA.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          <p>No media items found.</p>
        </div>
      )}
    </div>
  );
}

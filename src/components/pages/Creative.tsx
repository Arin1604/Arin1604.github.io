import { Play } from 'lucide-react';
import { mediaItems } from '@/data';
import type { MediaItem } from '@/types';

export default function Creative() {
  return (
    <main className="min-h-screen bg-gray-1200 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-12">Creative Work</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mediaItems.map((item, index) => (
            <MediaCard key={index} {...item} />
          ))}
        </div>
      </div>
    </main>
  );
}

function MediaCard({ type, title, description, thumbnail, videoUrl = ''}: MediaItem) {
  // Function to get YouTube thumbnail URL from video URL
  const getYouTubeThumbnail = (url: string) => {
    const videoId = new URL(url).searchParams.get('v');
    return `https://img.youtube.com/vi/${videoId}/0.jpg`;
  };

  // Determine the correct thumbnail based on media type
  const mediaThumbnail = type === 'videoy' ? getYouTubeThumbnail(videoUrl) : thumbnail;

  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <img
        src={mediaThumbnail}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <div className="text-center p-4">
          <h3 className="text-xl font-semibold text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-300 text-sm mb-4">
            {description}
          </p>
          {(type === 'video' || type === 'videoy') && (
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors duration-200"
            >
              <Play className="mr-2" size={20} />
              Watch Video
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

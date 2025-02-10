import { Play } from 'lucide-react';
import type { MediaItem } from '@/types';

interface MediaCardProps extends MediaItem {
  onClick: (item: MediaItem) => void;
}

const MediaCard: React.FC<MediaCardProps> = ({ type, title, description, thumbnail, videoUrl='', onClick }) => {
  const handleCardClick = () => {
    onClick({ type, title, description, thumbnail, videoUrl });
  };

  const videoId = videoUrl.split('v=')[1]; // Extract the video ID
  const youtubeThumbnail = `https://img.youtube.com/vi/${videoId}/0.jpg`;

  return (
    <div className="group relative overflow-hidden rounded-lg aspect-video cursor-pointer" onClick={handleCardClick}>
      {type === 'video' ? (
        <img
          src={youtubeThumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
      ) : (
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <div className="text-center p-4">
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-200 text-sm mb-4">{description}</p>
          {type === 'video' && (
            <div className="inline-flex items-center text-white">
              <Play className="mr-2" size={20} />
              Watch Video
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaCard;

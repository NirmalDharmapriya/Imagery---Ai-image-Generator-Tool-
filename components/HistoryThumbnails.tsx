import React from 'react';
import type { GeneratedImage } from '../types';

interface HistoryThumbnailsProps {
  history: GeneratedImage[];
  onThumbnailClick: (image: GeneratedImage) => void;
  currentImageId?: string | null;
}

const HistoryThumbnails: React.FC<HistoryThumbnailsProps> = ({ history, onThumbnailClick, currentImageId }) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Generation History</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {history.map((image) => (
          <button
            key={image.id}
            onClick={() => onThumbnailClick(image)}
            className={`aspect-square rounded-lg overflow-hidden focus:outline-none transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200 focus:ring-blue-500 ${
              currentImageId === image.id ? 'border-4 border-blue-500' : 'border-2 border-gray-400 hover:border-blue-400'
            }`}
            aria-label={`View image with prompt: ${image.prompt}`}
          >
            <img
              src={image.url}
              alt={image.prompt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default HistoryThumbnails;
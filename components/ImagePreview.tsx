
import React from 'react';
import type { GeneratedImage } from '../types';
import Loader from './Loader';

interface ImagePreviewProps {
  image: GeneratedImage | null;
  isLoading: boolean;
  onDownload: () => void;
}

const ImageIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);


const ImagePreview: React.FC<ImagePreviewProps> = ({ image, isLoading, onDownload }) => {
  return (
    <div className="bg-slate-800/50 rounded-lg shadow-lg p-4 flex flex-col items-center justify-center aspect-square border border-slate-700 relative overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center z-10">
          <Loader />
        </div>
      )}

      {!isLoading && !image && (
        <div className="text-center text-slate-500 space-y-2">
          <ImageIcon />
          <p>Your generated image will appear here</p>
        </div>
      )}

      {image && (
        <>
          <img
            src={image.url}
            alt={image.prompt}
            className="w-full h-full object-contain rounded-md"
          />
          <button
            onClick={onDownload}
            className="absolute bottom-4 right-4 bg-indigo-600 text-white py-2 px-4 rounded-full shadow-lg hover:bg-indigo-700 transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500"
            aria-label="Download image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

export default ImagePreview;

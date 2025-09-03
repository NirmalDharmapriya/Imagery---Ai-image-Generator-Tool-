import React, { useState, useCallback } from 'react';
import type { GeneratedImage, AspectRatio } from './types';
import { generateImageFromPrompt } from './services/geminiService';
import { slugify } from './utils/helpers';
import PromptForm from './components/PromptForm';
import ImagePreview from './components/ImagePreview';
import HistoryThumbnails from './components/HistoryThumbnails';
import ErrorMessage from './components/ErrorMessage';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [history, setHistory] = useState<GeneratedImage[]>([]);
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null);
  const [lastSuccessfulPrompt, setLastSuccessfulPrompt] = useState<{ prompt: string; aspectRatio: AspectRatio } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (p: string, ar: AspectRatio) => {
    if (!p.trim()) {
      setError('Please enter a prompt to generate an image.');
      return;
    }
    
    // As per project requirements, the API key must be an environment variable.
    // This check provides a clear error message if it's missing.
    // In a production build, this key would be bundled or accessed via a secure backend proxy.
    if (!process.env.API_KEY) {
      setError('API_KEY environment variable not set. Please refer to the setup instructions.');
      console.error("API_KEY is not configured.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setCurrentImage(null);

    try {
      const imageUrl = await generateImageFromPrompt(p, ar);
      const newImage: GeneratedImage = {
        id: `img_${Date.now()}`,
        url: imageUrl,
        prompt: p,
        aspectRatio: ar,
      };

      setCurrentImage(newImage);
      setHistory(prev => [newImage, ...prev]);
      setLastSuccessfulPrompt({ prompt: p, aspectRatio: ar });
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to generate image. Please try again. Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleRegenerate = useCallback(() => {
    if (lastSuccessfulPrompt) {
      handleGenerate(lastSuccessfulPrompt.prompt, lastSuccessfulPrompt.aspectRatio);
    } else {
      setError("No previous successful generation to regenerate.");
    }
  }, [lastSuccessfulPrompt, handleGenerate]);

  const handleDownload = useCallback(() => {
    if (!currentImage) return;

    const link = document.createElement('a');
    link.href = currentImage.url;
    const filename = `${Date.now()}-${slugify(currentImage.prompt)}.png`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [currentImage]);

  const handleThumbnailClick = (image: GeneratedImage) => {
    setCurrentImage(image);
  };

  return (
    <div className="min-h-screen bg-gray-200 text-gray-800 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
            AI Image Generator
          </h1>
          <p className="text-gray-600 mt-2">Powered by Google Gemini API</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <PromptForm
              prompt={prompt}
              setPrompt={setPrompt}
              aspectRatio={aspectRatio}
              setAspectRatio={setAspectRatio}
              onGenerate={() => handleGenerate(prompt, aspectRatio)}
              onRegenerate={handleRegenerate}
              isLoading={isLoading}
              canRegenerate={!!lastSuccessfulPrompt}
            />
          </div>
          <div className="lg:col-span-8">
            <ImagePreview 
              image={currentImage} 
              isLoading={isLoading}
              onDownload={handleDownload}
            />
          </div>
        </main>
        
        {error && <ErrorMessage message={error} onClose={() => setError(null)} />}

        <HistoryThumbnails 
          history={history} 
          onThumbnailClick={handleThumbnailClick}
          currentImageId={currentImage?.id}
        />
      </div>
    </div>
  );
};

export default App;
import React from 'react';
import type { AspectRatio } from '../types';

interface PromptFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (ratio: AspectRatio) => void;
  onGenerate: () => void;
  onRegenerate: () => void;
  isLoading: boolean;
  canRegenerate: boolean;
}

const aspectRatios: AspectRatio[] = ['1:1', '4:3', '16:9', '9:16'];

const PromptForm: React.FC<PromptFormProps> = ({
  prompt,
  setPrompt,
  aspectRatio,
  setAspectRatio,
  onGenerate,
  onRegenerate,
  isLoading,
  canRegenerate,
}) => {
  const maxPromptLength = 1000;

  return (
    <div className="bg-gray-50 rounded-lg shadow-md p-6 space-y-6 h-full flex flex-col border border-gray-300">
      <div className="flex-grow flex flex-col">
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
          Image Prompt
        </label>
        <div className="relative flex-grow">
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A futuristic cityscape at dusk, with flying cars and neon lights..."
            className="w-full h-full min-h-[150px] bg-white border border-gray-300 rounded-md p-3 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 resize-none"
            maxLength={maxPromptLength}
            disabled={isLoading}
            aria-describedby="prompt-character-count"
          />
          <div id="prompt-character-count" className="absolute bottom-2 right-2 text-xs text-gray-500">
            {prompt.length} / {maxPromptLength}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Aspect Ratio
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {aspectRatios.map((ratio) => (
            <button
              key={ratio}
              type="button"
              onClick={() => setAspectRatio(ratio)}
              disabled={isLoading}
              className={`py-2 px-3 text-sm rounded-md transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500 ${
                aspectRatio === ratio
                  ? 'bg-blue-600 text-white font-bold border border-blue-700'
                  : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
              }`}
            >
              {ratio}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-3 pt-2">
        <button
          onClick={onGenerate}
          disabled={isLoading || !prompt}
          className="w-full flex justify-center items-center bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:text-white/75 disabled:cursor-not-allowed transition-all duration-200 border-b-4 border-blue-800 active:translate-y-1 active:border-b-0 disabled:border-0 disabled:translate-y-0"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            'Generate'
          )}
        </button>
        <button
          onClick={onRegenerate}
          disabled={isLoading || !canRegenerate}
          className="w-full bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md hover:bg-gray-400 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-150 border-b-4 border-gray-500 active:translate-y-1 active:border-b-0 disabled:border-0 disabled:translate-y-0"
        >
          Regenerate Last Image
        </button>
      </div>
    </div>
  );
};

export default PromptForm;
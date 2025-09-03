
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
    <div className="bg-slate-800/50 rounded-lg shadow-lg p-6 space-y-6 h-full flex flex-col border border-slate-700">
      <div className="flex-grow flex flex-col">
        <label htmlFor="prompt" className="block text-sm font-medium text-slate-300 mb-2">
          Image Prompt
        </label>
        <div className="relative flex-grow">
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A futuristic cityscape at dusk, with flying cars and neon lights..."
            className="w-full h-full min-h-[150px] bg-slate-900 border border-slate-600 rounded-md p-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 resize-none"
            maxLength={maxPromptLength}
            disabled={isLoading}
            aria-describedby="prompt-character-count"
          />
          <div id="prompt-character-count" className="absolute bottom-2 right-2 text-xs text-slate-500">
            {prompt.length} / {maxPromptLength}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Aspect Ratio
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {aspectRatios.map((ratio) => (
            <button
              key={ratio}
              type="button"
              onClick={() => setAspectRatio(ratio)}
              disabled={isLoading}
              className={`py-2 px-3 text-sm rounded-md transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 ${
                aspectRatio === ratio
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
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
          className="w-full flex justify-center items-center bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-800/50 disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
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
          className="w-full bg-slate-700 text-slate-300 font-bold py-2 px-4 rounded-md hover:bg-slate-600 disabled:bg-slate-700/50 disabled:text-slate-500 disabled:cursor-not-allowed transition duration-150"
        >
          Regenerate Last Image
        </button>
      </div>
    </div>
  );
};

export default PromptForm;

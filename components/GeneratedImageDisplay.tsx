import React from 'react';
import type { GeneratedImage } from '../types';
import { DownloadIcon } from './icons/DownloadIcon';

interface GeneratedImageDisplayProps {
    image: GeneratedImage;
}

export const GeneratedImageDisplay: React.FC<GeneratedImageDisplayProps> = ({ image }) => {
    return (
        <div className="mt-12">
            <h2 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">Your Dreamscape is Ready!</h2>
            <div className="bg-gray-800/50 rounded-lg p-4 md:p-6 border border-gray-700/50 relative group">
                <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-auto object-contain rounded-md shadow-2xl"
                />
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
                     <a
                        href={image.url}
                        download={`dreamscape-${Date.now()}.png`}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                        <DownloadIcon className="w-5 h-5 mr-2"/>
                        Download Image
                    </a>
                </div>
            </div>
             <div className="mt-4 p-4 bg-gray-800 rounded-lg text-sm text-gray-400">
                <p className="font-semibold text-gray-300">Generation Prompt:</p>
                <p className="italic">"{image.prompt}"</p>
            </div>
        </div>
    );
};

import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

export const Header: React.FC = () => {
    return (
        <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-700/50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-center">
                     <SparklesIcon className="w-8 h-8 mr-3 text-purple-400" />
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                        AI Dreamscape
                    </h1>
                </div>
            </div>
        </header>
    );
};

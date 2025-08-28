import React from 'react';

export const LoadingSpinner: React.FC = () => {
    return (
        <div className="mt-10 flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 border-4 border-t-purple-500 border-r-purple-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            <p className="text-lg text-gray-300 animate-pulse">AI is dreaming up your reality...</p>
        </div>
    );
};

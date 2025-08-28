import React, { useState } from 'react';
import { DESTINATIONS } from '../constants';
import { LocationMarkerIcon } from './icons/LocationMarkerIcon';

interface DestinationSelectorProps {
    selectedDestination: string;
    onSelectDestination: (destination: string) => void;
}

const destinationCategories = Object.keys(DESTINATIONS);

export const DestinationSelector: React.FC<DestinationSelectorProps> = ({ selectedDestination, onSelectDestination }) => {
    const [activeCategory, setActiveCategory] = useState<string>(destinationCategories[0]);

    return (
        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
            <h3 className="text-xl font-semibold mb-6 text-center text-gray-300 flex items-center justify-center">
                <LocationMarkerIcon className="w-6 h-6 mr-2" />
                Choose a Destination
            </h3>

            <div className="flex flex-wrap justify-center gap-2 mb-6 border-b border-gray-700 pb-4">
                {destinationCategories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            activeCategory === category
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="flex flex-wrap justify-center gap-2">
                {DESTINATIONS[activeCategory].map((dest) => (
                    <button
                        key={dest}
                        onClick={() => onSelectDestination(dest)}
                        className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                            selectedDestination === dest
                                ? 'bg-purple-600 text-white shadow-md'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                        }`}
                    >
                        {dest}
                    </button>
                ))}
            </div>
        </div>
    );
};
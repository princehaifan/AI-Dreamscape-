import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { DestinationSelector } from './components/DestinationSelector';
import { LoadingSpinner } from './components/LoadingSpinner';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { GeneratedImageDisplay } from './components/GeneratedImageDisplay';
import { generateDreamImage } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import type { UploadedFile, GeneratedImage } from './types';

const getDetailedErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        const message = error.message.toLowerCase();
        
        if (message.includes('safety') || message.includes('blocked')) {
            return "Image generation was blocked due to content safety policies. Please try using different images or a different destination.";
        }
        
        if (message.includes('invalid argument') || message.includes('unsupported image')) {
            return "One of the uploaded images has an invalid format or is corrupted. Please use a standard PNG, JPG, or WEBP file.";
        }

        if (message.includes('api key')) {
             return "There is a configuration issue with the AI service. Please contact support if this issue persists.";
        }
        
        return "The AI service failed to generate an image. It might be busy or the request could not be processed. Please try again in a moment.";
    }
    
    return "An unknown error occurred. Please try again.";
};

const App: React.FC = () => {
    const [userPhoto, setUserPhoto] = useState<UploadedFile | null>(null);
    const [celebrityPhoto, setCelebrityPhoto] = useState<UploadedFile | null>(null);
    const [destination, setDestination] = useState<string>('');
    const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const isGenerationDisabled = !userPhoto || !celebrityPhoto || !destination || isLoading;

    const handleGenerate = useCallback(async () => {
        if (isGenerationDisabled) return;

        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);

        try {
            if (!userPhoto || !celebrityPhoto || !destination) {
                throw new Error("Please provide all inputs.");
            }

            const userPhotoBase64 = await fileToBase64(userPhoto.file);
            const celebrityPhotoBase64 = await fileToBase64(celebrityPhoto.file);

            const result = await generateDreamImage({
                user: { base64: userPhotoBase64, mimeType: userPhoto.file.type },
                celebrity: { base64: celebrityPhotoBase64, mimeType: celebrityPhoto.file.type },
                destination: destination
            });

            if (result) {
                setGeneratedImage(result);
            } else {
                throw new Error("The AI could not generate an image. Please try a different combination.");
            }
        } catch (err) {
            console.error(err);
            setError(getDetailedErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    }, [userPhoto, celebrityPhoto, destination, isGenerationDisabled]);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-5xl mx-auto">
                    <p className="text-center text-lg md:text-xl text-gray-400 mb-8">
                        Upload your photo, pick a celebrity, choose a dream destination, and let our AI create your perfect, unseen reality.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <ImageUploader id="user-photo" title="Your Photo" onFileChange={setUserPhoto} />
                        <ImageUploader id="celebrity-photo" title="Celebrity's Photo" onFileChange={setCelebrityPhoto} />
                    </div>

                    <DestinationSelector selectedDestination={destination} onSelectDestination={setDestination} />

                    <div className="mt-12 text-center">
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerationDisabled}
                            className={`inline-flex items-center justify-center px-12 py-4 border border-transparent text-lg font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100`}
                        >
                            <SparklesIcon className="w-6 h-6 mr-3" />
                            {isLoading ? 'Generating...' : 'Create My Dreamscape'}
                        </button>
                    </div>

                    {isLoading && <LoadingSpinner />}
                    
                    {error && (
                        <div className="mt-8 p-4 text-center bg-red-900/50 border border-red-700 text-red-300 rounded-lg" role="alert">
                            <p><strong>Error:</strong> {error}</p>
                        </div>
                    )}

                    {generatedImage && (
                        <GeneratedImageDisplay image={generatedImage} />
                    )}
                </div>
            </main>
        </div>
    );
};

export default App;
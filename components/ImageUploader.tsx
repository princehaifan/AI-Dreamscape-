import React, { useState, useCallback } from 'react';
import type { UploadedFile } from '../types';
import { UploadIcon } from './icons/UploadIcon';
import { TrashIcon } from './icons/TrashIcon';

interface ImageUploaderProps {
    id: string;
    title: string;
    onFileChange: (file: UploadedFile | null) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ id, title, onFileChange }) => {
    const [filePreview, setFilePreview] = useState<string | null>(null);

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setFilePreview(previewUrl);
            onFileChange({ file, preview: previewUrl });
        }
    }, [onFileChange]);
    
    const handleRemoveImage = useCallback(() => {
        setFilePreview(null);
        onFileChange(null);
        const input = document.getElementById(id) as HTMLInputElement;
        if (input) {
            input.value = '';
        }
    }, [id, onFileChange]);

    return (
        <div className="bg-gray-800/50 rounded-lg p-6 flex flex-col items-center justify-center border-2 border-dashed border-gray-600 h-64 transition-all duration-300 hover:border-purple-500 hover:bg-gray-800">
            <h3 className="text-xl font-semibold mb-4 text-gray-300">{title}</h3>
            {filePreview ? (
                <div className="relative w-full h-full flex items-center justify-center">
                    <img src={filePreview} alt="Preview" className="max-h-full max-w-full object-contain rounded-md shadow-lg" />
                    <button
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white hover:bg-red-600/80 transition-colors"
                        aria-label="Remove image"
                    >
                       <TrashIcon className="w-5 h-5" />
                    </button>
                </div>
            ) : (
                <label htmlFor={id} className="cursor-pointer text-center flex flex-col items-center">
                    <UploadIcon className="w-10 h-10 text-gray-500 mb-2" />
                    <span className="text-purple-400 font-medium">Click to upload image</span>
                    <p className="text-xs text-gray-500 mt-1">Accepted: PNG, JPG, WEBP</p>
                    <input id={id} type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
                </label>
            )}
        </div>
    );
};

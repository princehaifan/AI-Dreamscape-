import { GoogleGenAI, Modality } from "@google/genai";
import type { GenerationParams, GeneratedImage } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDreamImage = async (params: GenerationParams): Promise<GeneratedImage | null> => {
    const { user, celebrity, destination } = params;

    const prompt = `Create a high-quality, realistic photograph. In the photo, place the person from the first image and the celebrity from the second image together in this location: ${destination}. They should appear to be interacting naturally and enjoying their time. The lighting and style should be consistent and believable as if it were a real photo.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
                parts: [
                    { inlineData: { data: user.base64, mimeType: user.mimeType } },
                    { inlineData: { data: celebrity.base64, mimeType: celebrity.mimeType } },
                    { text: prompt },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        const imagePart = response.candidates?.[0]?.content?.parts.find(part => part.inlineData);

        if (imagePart && imagePart.inlineData) {
            const base64ImageBytes = imagePart.inlineData.data;
            const mimeType = imagePart.inlineData.mimeType || 'image/png';
            const imageUrl = `data:${mimeType};base64,${base64ImageBytes}`;
            return {
                url: imageUrl,
                alt: `AI generated image of a person and celebrity at ${destination}`,
                prompt,
            };
        }
        return null;
    } catch (error) {
        console.error("Error generating image with Gemini:", error);
        // Re-throw the original error to allow for more specific handling upstream.
        throw error;
    }
};
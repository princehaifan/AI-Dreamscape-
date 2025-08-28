export interface UploadedFile {
  file: File;
  preview: string;
}

export interface ImageData {
  base64: string;
  mimeType: string;
}

export interface GenerationParams {
  user: ImageData;
  celebrity: ImageData;
  destination: string;
}

export interface GeneratedImage {
    url: string;
    alt: string;
    prompt: string;
}

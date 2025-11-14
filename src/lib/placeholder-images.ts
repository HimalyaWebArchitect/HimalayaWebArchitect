import data from './placeholder-images.json';

export type ImagePlaceholder = {
  name: React.ReactNode;
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  localPath: string;
  demoUrl?: string;
};

// This module is client-safe: it simply maps the configured localPath to imageUrl.
// Ensure your files are placed under /public according to the `localPath` values.
export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages.map((img: any) => {
  const localPath: string = img.localPath;
  return { ...img, imageUrl: localPath };
});

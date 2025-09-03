
export type AspectRatio = '1:1' | '4:3' | '16:9' | '9:16';

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  aspectRatio: AspectRatio;
}

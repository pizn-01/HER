/*
 * Generated from /public/images. Dimensions are baked in so next/image can
 * reserve the right space and the masonry never jumps while photos load.
 *
 * Added new photos? Drop them in /public/images and add a line here.
 * The original filenames are kept in /public/images/_original-filenames.txt.
 */

export type PhotoAsset = { src: string; w: number; h: number };
export type ClipAsset = { src: string };

export const PHOTOS: PhotoAsset[] = [
  { src: "/images/moment-01.jpg", w: 1080, h: 1920 },
  { src: "/images/moment-02.jpg", w: 1440, h: 1080 },
  { src: "/images/moment-03.jpg", w: 1080, h: 1920 },
  { src: "/images/moment-04.jpg", w: 1440, h: 1080 },
  { src: "/images/moment-05.jpg", w: 1440, h: 1080 },
  { src: "/images/moment-06.jpg", w: 1080, h: 1920 },
  { src: "/images/moment-07.jpg", w: 1080, h: 1920 },
  { src: "/images/moment-08.jpg", w: 1080, h: 1920 },
  { src: "/images/moment-09.jpg", w: 1440, h: 1080 },
  { src: "/images/moment-10.jpg", w: 1440, h: 1080 },
  { src: "/images/moment-11.jpg", w: 1080, h: 1920 },
  { src: "/images/moment-12.jpg", w: 1440, h: 1080 },
  { src: "/images/moment-13.jpg", w: 1080, h: 1440 },
  { src: "/images/moment-14.jpg", w: 664, h: 1280 },
  { src: "/images/moment-15.jpg", w: 677, h: 1280 },
  { src: "/images/moment-16.jpg", w: 720, h: 1280 },
  { src: "/images/moment-17.jpg", w: 720, h: 1280 },
  { src: "/images/moment-18.jpg", w: 720, h: 1280 },
  { src: "/images/moment-19.jpg", w: 720, h: 1280 },
  { src: "/images/moment-20.jpg", w: 720, h: 1280 },
  { src: "/images/moment-21.jpg", w: 720, h: 1280 },
  { src: "/images/moment-22.jpg", w: 720, h: 1280 },
  { src: "/images/moment-23.jpg", w: 720, h: 1280 },
  { src: "/images/moment-24.jpg", w: 720, h: 1280 },
  { src: "/images/moment-25.jpg", w: 720, h: 1280 },
  { src: "/images/moment-26.jpg", w: 1200, h: 1600 },
  { src: "/images/moment-27.jpg", w: 1200, h: 1600 },
  { src: "/images/moment-28.jpg", w: 720, h: 1280 },
  { src: "/images/moment-29.jpg", w: 1200, h: 1600 },
  { src: "/images/moment-30.jpg", w: 720, h: 1280 },
  { src: "/images/moment-31.jpg", w: 720, h: 1280 },
  { src: "/images/moment-32.jpg", w: 720, h: 1280 },
  { src: "/images/moment-33.jpg", w: 720, h: 1280 },
  { src: "/images/moment-34.jpg", w: 720, h: 1280 },
  { src: "/images/moment-35.jpg", w: 720, h: 1280 },
  { src: "/images/moment-36.jpg", w: 1599, h: 899 },
  { src: "/images/moment-37.jpg", w: 720, h: 1280 },
  { src: "/images/moment-38.jpg", w: 720, h: 1280 },
  { src: "/images/moment-39.jpg", w: 768, h: 1275 },
  { src: "/images/moment-40.jpg", w: 720, h: 1280 },
  { src: "/images/moment-41.jpg", w: 768, h: 1283 },
  { src: "/images/moment-42.jpg", w: 899, h: 1599 },
  { src: "/images/moment-43.jpg", w: 899, h: 1599 },
  { src: "/images/moment-44.jpg", w: 1440, h: 1080 },
  { src: "/images/moment-45.jpg", w: 1440, h: 1080 },
  { src: "/images/moment-46.jpg", w: 1440, h: 1080 },
  { src: "/images/moment-47.jpg", w: 1440, h: 1080 },
  { src: "/images/moment-48.jpg", w: 1440, h: 1080 },
  { src: "/images/moment-49.jpg", w: 1440, h: 1080 },
  { src: "/images/moment-50.jpg", w: 1440, h: 1080 },
  { src: "/images/moment-51.jpg", w: 1440, h: 1080 },
  // Not in the gallery: used once, beside the WhatsApp button.
  { src: "/images/us-sticker.png", w: 699, h: 639 },
];

export const CLIPS: ClipAsset[] = [
  { src: "/images/clip-01.mp4" },
  { src: "/images/clip-02.mp4" },
  { src: "/images/clip-03.mp4" },
  { src: "/images/clip-04.mp4" },
  { src: "/images/clip-05.mp4" },
  { src: "/images/clip-06.mp4" },
  { src: "/images/clip-07.mp4" },
  { src: "/images/clip-08.mp4" },
];

/** Look up baked dimensions for a photo referenced elsewhere by path. */
export function photoBySrc(src: string): PhotoAsset | undefined {
  return PHOTOS.find((p) => p.src === src);
}

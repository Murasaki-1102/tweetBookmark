import { VideoVariant } from "../types/tweet";

export const getHighestImageQualityUrl = (url: string): string =>
  url?.replace("_normal", "");

export const getHighestBitrateUrl = (videoVariants: VideoVariant[]): string => {
  const mp4Variants = videoVariants.filter(
    (variant) => variant.content_type === "video/mp4"
  );
  const highestVariants = mp4Variants.reduce((a, b) =>
    a.bitrate! > b.bitrate! ? a : b
  );
  return highestVariants.url;
};

export type MediaType = {
  id: number;
  id_str: string;
  indices: number[];
  media_url: string;
  media_url_https: string;
  type: "photo";
  url: string;
  display_url: string;
  expanded_url: string;
  sizes: {
    medium?: { w: number; h: number; resize: "fit" | "crop" };
    large?: { w: number; h: number; resize: "fit" | "crop" };
    small?: { w: number; h: number; resize: "fit" | "crop" };
    thumb?: { w: number; h: number; resize: "fit" | "crop" };
  };
};

export type TweetType = {
  // id: number;
  id_str: string;
  created_at: Date;
  // favorite_count: number;
  // favorited: boolean;
  // retweet_count: number;
  // retweeted: boolean;
  // text?: string;
  full_text: string;
  user: {
    displayName: string;
    screenName: string;
  };
  extended_entities?: {
    media?: MediaType[];
  };
};

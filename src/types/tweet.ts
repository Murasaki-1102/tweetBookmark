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
  // extended_entities?: {
  //   media?: {
  //     id: number;
  //     id_str: string;
  //     media_url: string;
  //     media_url_https: string;
  //     type: "photo" | "video";
  //     video_info?: {
  //       // variants: VideoVariant[];
  //     };
  //   }[];
  // };
};

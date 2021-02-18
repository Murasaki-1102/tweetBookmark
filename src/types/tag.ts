import { TweetType } from "./tweet";

export type Tag = {
  id: string;
  index: number;
  name: string;
  emoji: string;
  tweets: TweetType[];
  createdAt: Date;
};

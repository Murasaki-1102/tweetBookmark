import { useEffect } from "react";
import { useTwitter as simpleTwitter } from "react-native-simple-twitter";
import { BigNumber } from "bignumber.js";
import { API_KEY, API_KEY_SECRET } from "@env";
import { TweetType } from "../types/tweet";

type useTwitterProps = {
  onSuccess?: (
    user: any, // Fix
    accessToken: { oauth_token: string; oauth_token_secret: string }
  ) => void;
  onError?: (err: {
    errors: {
      code: number;
      message: string;
    }[];
  }) => void;
};

export const useTwitter = (props?: useTwitterProps) => {
  const { twitter, TWModal } = simpleTwitter({ ...(props as any) });

  useEffect(() => {
    twitter.setConsumerKey(API_KEY, API_KEY_SECRET);
  }, []);

  const getFavoriteTweets = async () =>
    twitter
      .get("favorites/list.json", {
        count: 20,
        tweet_mode: "extended",
      })
      .then((res) => res as TweetType[]);

  const getMoreFavoriteTweets = async (id: string) => {
    const max_id = new BigNumber(id).minus(1).c?.join("");
    return twitter
      .get("favorites/list.json", {
        count: 20,
        max_id,
        tweet_mode: "extended",
      })
      .then((res: any) => res as TweetType[]);
  };

  return {
    twitter,
    TWModal,
    getFavoriteTweets,
    getMoreFavoriteTweets,
  };
};

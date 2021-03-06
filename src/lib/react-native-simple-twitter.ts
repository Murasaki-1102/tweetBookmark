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

  const getRateLimitStatus = async () => {
    try {
      return twitter.get("application/rate_limit_status.json", {
        resources: "favorites",
      });
    } catch (error) {
      console.warn(error);
    }
  };

  const getFavoriteTweets = async () =>
    twitter
      .get("favorites/list.json", {
        count: 200,
        tweet_mode: "extended",
      })
      .then((res) => res as TweetType[])
      .catch((e) => e.errors);

  const getMoreFavoriteTweets = async (id: string) => {
    const max_id = new BigNumber(id).minus(1).c?.join("");
    return twitter
      .get("favorites/list.json", {
        count: 200,
        max_id,
        tweet_mode: "extended",
      })
      .then((res) => res as TweetType[])
      .catch((e) => e.errors);
  };

  return {
    twitter,
    TWModal,
    getRateLimitStatus,
    getFavoriteTweets,
    getMoreFavoriteTweets,
  };
};

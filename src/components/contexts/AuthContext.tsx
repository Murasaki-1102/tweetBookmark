import React, { FC, useState, useEffect, createContext } from "react";
import { useTwitter } from "react-native-simple-twitter";
import { API_KEY, API_KEY_SECRET } from "@env";
import firebase from "../../lib/firebase";

type AuthContextValue = {
  auth: () => Promise<void>;
  TWModal: any;
  getFavoriteTweets: any;
};

export const AuthContext = createContext<AuthContextValue>(
  {} as AuthContextValue
);

export const AuthProvider: FC = ({ children }) => {
  const [oauthToken, setOauthToken] = useState({});
  const { twitter, TWModal } = useTwitter({
    onSuccess: async (user, accessToken) => {
      await twitter.setAccessToken(
        accessToken.oauth_token,
        accessToken.oauth_token_secret
      );
      await setOauthToken({ oauthToken });
      const credential = firebase.auth.TwitterAuthProvider.credential(
        accessToken.oauth_token,
        accessToken.oauth_token_secret
      );
      firebase
        .auth()
        .signInWithCredential(credential)
        .then(async (result) => {
          console.log(result);
          const userDocument = await firebase
            .firestore()
            .collection("users")
            .doc(result.user?.uid)
            .get();
          if (!userDocument.exists) {
            await firebase
              .firestore()
              .collection("users")
              .doc(result.user?.uid)
              .set({
                uid: result.user?.uid,
                name: result.user?.displayName,
                screenName: result.additionalUserInfo?.username,
                photoUrl: result.user?.photoURL,
              });
          }
        });
    },
  });

  const auth = async () => {
    try {
      await twitter.login();
    } catch (e) {
      console.log(e.errors);
    }
  };

  useEffect(() => {
    twitter.setConsumerKey(API_KEY, API_KEY_SECRET);
  }, []);

  const getFavoriteTweets = async () => {
    // const hoge = await twitter.get("favorites/list.json", {
    //   count: 100,
    //   tweet_mode: "extended",
    // });
  };

  return (
    <AuthContext.Provider value={{ auth, TWModal, getFavoriteTweets }}>
      {children}
    </AuthContext.Provider>
  );
};

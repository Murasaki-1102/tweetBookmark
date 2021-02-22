import React, {
  FC,
  useState,
  useEffect,
  useCallback,
  createContext,
  useMemo,
} from "react";
import { NativeModules } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { useTwitter } from "../../lib/react-native-simple-twitter";
import firebase from "../../lib/firebase";
import { User } from "../../types/user";

type AuthStateContextValue = {
  user: User | null;
};
export const AuthStateContext = createContext({} as AuthStateContextValue);

type AuthActionContextValue = {
  auth: () => void;
  logout: () => void;
  TWModal: (props: any) => JSX.Element;
};
export const AuthActionContext = createContext({} as AuthActionContextValue);

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { twitter, TWModal } = useTwitter({
    onSuccess: async (user, accessToken) => {
      twitter.setAccessToken(
        accessToken.oauth_token,
        accessToken.oauth_token_secret
      );
      AsyncStorage.setItem("@oauthToken", JSON.stringify(accessToken));

      const credential = firebase.auth.TwitterAuthProvider.credential(
        accessToken.oauth_token,
        accessToken.oauth_token_secret
      );

      firebase
        .auth()
        .signInWithCredential(credential)
        .then(async (result) => {
          const userDocument = await firebase
            .firestore()
            .collection("users")
            .doc(result.user?.uid)
            .get();

          if (!userDocument.exists) {
            firebase.firestore().collection("users").doc(result.user?.uid).set({
              uid: result.user?.uid,
              name: result.user?.displayName,
              photoUrl: result.user?.photoURL,
            });
          }
          setUser({
            uid: result.user?.uid!,
            name: result.user?.displayName!,
            photoUrl: result.user?.photoURL!,
          });
        });
    },
  });

  useEffect(() => {
    if (user) return;
    const loadSplashScreen = async () =>
      await SplashScreen.preventAutoHideAsync();

    loadSplashScreen();
    firebase.auth().onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const accessToken = await AsyncStorage.getItem(
          "@oauthToken"
        ).then((result) => JSON.parse(result!));
        twitter.setAccessToken(
          accessToken.oauth_token,
          accessToken.oauth_token_secret
        );
        setUser({
          uid: firebaseUser.uid!,
          name: firebaseUser.displayName!,
          photoUrl: firebaseUser.photoURL!,
        });
        setIsLoading(false);
        await SplashScreen.hideAsync();
      } else {
        setUser(null);
        if (isLoading) {
          await SplashScreen.hideAsync();
          setIsLoading(false);
        }
      }
    });
  }, []);

  const auth = useCallback(() => {
    try {
      twitter.login();
    } catch (e) {
      console.log(e);
    }
  }, [twitter]);

  const logout = useCallback(() => {
    twitter.setAccessToken("", "");
    firebase.auth().signOut();
    NativeModules.Networking.clearCookies(() => {});
  }, [twitter]);

  const actions = useMemo(
    () => ({
      auth,
      logout,
      TWModal,
    }),
    [auth, logout, TWModal]
  );

  return (
    <AuthStateContext.Provider value={{ user }}>
      <AuthActionContext.Provider value={actions}>
        {!isLoading && children}
      </AuthActionContext.Provider>
    </AuthStateContext.Provider>
  );
};

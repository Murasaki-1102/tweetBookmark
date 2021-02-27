import React, { FC, useState, useEffect, useCallback } from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LogBox, SafeAreaView } from "react-native";
import { Div } from "react-native-magnus";
import { RootStackParamList } from "../../types/navigation";
import { TweetList } from "../organisms/TweetList";
import firebase from "../../lib/firebase";
import { TweetType } from "../../types/tweet";
import { SearchInput } from "../molecules/SearchInput";
import { useAuthState } from "../../hooks/useAuth/useAuth";

type TagDetailScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "TagDetail">;
  route: RouteProp<RootStackParamList, "TagDetail">;
};

export const TagDetailScreen: FC<TagDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const [tweets, setTweets] = useState({
    all: [] as TweetType[],
    tmp: [] as TweetType[],
  });
  const [keyword, setKeyword] = useState("");
  const { tag } = route.params;
  const { user } = useAuthState();
  console.log("🚀 ~ file: TagDetailScreen.tsx ~ line 19 ~ tag");
  // const { tagList } = useTagListState();
  //Non-serializable対策
  // const tag = tagList.find((tag) => tag.id === id);

  useEffect(() => {
    navigation.setOptions({ title: tag.name });
    LogBox.ignoreLogs([
      "Non-serializable values were found in the navigation state. Check",
    ]);
  }, [tag.name]);

  useEffect(() => {
    let unsubscribe = () => {};
    unsubscribe = firebase
      .firestore()
      .collection(`users/${user?.uid}/tags/${tag.id}/tweets`)
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (snapshot) => {
          const bookmarkedTweets: TweetType[] = [];
          snapshot.forEach((doc) => {
            bookmarkedTweets.push({ ...(doc.data().tweet as TweetType) });
          });
          setTweets({ all: bookmarkedTweets, tmp: bookmarkedTweets });
        },
        (error) => {
          console.log(error);
        }
      );
    return unsubscribe;
  }, []);

  const filterTweetByKeyword = useCallback(
    (keyword: string) => {
      setKeyword(keyword);
      const lowerCaseKeyword = keyword.toLowerCase();
      const filterTweet = tweets.tmp.filter((tweet) =>
        tweet.full_text.toLowerCase().includes(lowerCaseKeyword)
      );
      setTweets({ ...tweets, all: filterTweet });
    },
    [tweets]
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Div flex={1}>
        <SearchInput value={keyword} onChangeText={filterTweetByKeyword} />
        <TweetList tweets={tweets.all} tag={tag} />
      </Div>
    </SafeAreaView>
  );
};

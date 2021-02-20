import React, { FC, useState, useEffect, useCallback } from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LogBox, SafeAreaView } from "react-native";
import { Div, Input, Icon } from "react-native-magnus";
import { RootStackParamList } from "../../types/navigation";
import { TweetList } from "../organisms/TweetList";
import firebase from "../../lib/firebase";
import { TweetType } from "../../types/tweet";

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
  const { tag } = route.params;
  console.log("🚀 ~ file: TagDetailScreen.tsx ~ line 19 ~ tag");
  // const { tagList } = useTagListState();
  //Non-serializable対策
  // const tag = tagList.find((tag) => tag.id === id);

  useEffect(() => {
    navigation.setOptions({ title: tag.name });
    LogBox.ignoreLogs([
      "Non-serializable values were found in the navigation >state",
    ]);
  }, [tag.name]);

  useEffect(() => {
    const { currentUser } = firebase.auth();
    let unsubscribe = () => {};
    unsubscribe = firebase
      .firestore()
      .collection(`users/${currentUser?.uid}/tags/${tag.id}/tweets`)
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
        <Input
          borderBottomWidth={1}
          placeholder="キーワード検索"
          autoCapitalize="none"
          prefix={
            <Icon name="search" fontFamily="MaterialIcons" fontSize="2xl" />
          }
          onChangeText={filterTweetByKeyword}
        />
        <TweetList tweets={tweets.all} tag={tag} />
      </Div>
    </SafeAreaView>
  );
};

import React, { FC, useCallback } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { Button, Icon } from "react-native-magnus";
import { SwipeListView } from "react-native-swipe-list-view";
import { TweetType } from "../../types/tweet";
import { Tweet } from "./Tweet";
import firebase from "../../lib/firebase";
import { Tag } from "../../types/tag";
import { useAuthState } from "../../hooks/useAuth/useAuth";

type TweetListProps = {
  tweets: TweetType[];
  onEndReached?: () => void;
  tag?: Tag;
};

type SwipeableTweetListProps = {
  tweets: TweetType[];
  keyExtractor: (item: TweetType) => string;
  renderItem: ({ item }: { item: TweetType }) => JSX.Element;
  onEndReached?: () => void;
  tag: Tag;
};

const SwipeableTweetList: FC<SwipeableTweetListProps> = ({
  tag,
  tweets,
  keyExtractor,
  renderItem,
}) => {
  const { user } = useAuthState();
  const onDeleteTweet = async (tweet: TweetType) => {
    // FIX

    const db = firebase.firestore();
    // const batch = db.batch();

    const tweetDoc = db
      .collection(`users/${user?.uid}/tweets`)
      .doc(tweet.id_str);

    await tweetDoc.update({
      tagsId: firebase.firestore.FieldValue.arrayRemove(tag?.id),
    });

    tweetDoc.get().then((doc) => {
      if (!doc.data()?.tagsId.length) {
        tweetDoc.delete();
      }
    });

    const tagDoc = db.collection(`users/${user?.uid}/tags`).doc(tag?.id);
    await tagDoc.update({
      tweets: firebase.firestore.FieldValue.arrayRemove(tweet),
    });

    const tagsTweetDoc = db
      .collection(`users/${user?.uid}/tags/${tag?.id}/tweets`)
      .doc(tweet.id_str);

    await tagsTweetDoc.delete();

    // tagsTweetDoc.get().then((doc) => {
    //   if (!doc.data()?.tagsId.length) {
    //     tagsTweetDoc.delete();
    //   }
    // });
  };

  const renderHiddenItem = useCallback(
    ({ item }: { item: TweetType }) => (
      <Button
        bg="red600"
        h="100%"
        rounded="none"
        alignSelf="flex-end"
        onPress={() => {
          onDeleteTweet(item);
        }}
      >
        <Icon
          name="trash-can-outline"
          fontFamily="MaterialCommunityIcons"
          fontSize="6xl"
          px="lg"
          color="white"
        />
      </Button>
    ),
    []
  );

  return (
    <SwipeListView
      useFlatList
      data={tweets}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      rightOpenValue={-80}
      disableRightSwipe
    />
  );
};

export const TweetList: FC<TweetListProps> = ({
  tweets,
  onEndReached,
  tag,
}) => {
  const keyExtractor = useCallback((item) => item.id_str, []);

  const renderItem = useCallback(
    ({ item }: { item: TweetType }) => <Tweet tweet={item} />,
    []
  );

  console.log("🚀 ~ file: TweetList.tsx ~ line 11 ~ ");

  return (
    <>
      {tag ? (
        <SwipeableTweetList
          tag={tag}
          tweets={tweets}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      ) : (
        <FlatList
          data={tweets}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onEndReached={onEndReached}
        />
      )}
    </>
  );
};

import React, { FC } from "react";
import { TouchableHighlight } from "react-native";
import { Div, Text, Button, Image, Icon } from "react-native-magnus";
import { useBottomSheetAction } from "../../hooks/useBottomSheet/useBottomSheet";
import { useModalAction } from "../../hooks/useModal/useModalState";
import { useTagListState } from "../../hooks/useTagList/useTagList";
import { MediaType, TweetType } from "../../types/tweet";
import { PhotoModal } from "./Modal/PhotoModal";

type TweetProps = {
  tweet: TweetType;
};

const BottomSheetButton: FC<TweetProps> = ({ tweet }) => {
  console.log("button");
  const { openBottomSheet } = useBottomSheetAction();
  const { tagList } = useTagListState();
  const selectedTag: boolean = tagList.some(
    (tag) => tag.tweets.filter((t) => t.id_str === tweet.id_str).length
  );

  return (
    <Button
      py="none"
      onPress={() => {
        openBottomSheet(tweet);
      }}
    >
      {selectedTag ? (
        <Icon
          name="tag-plus"
          fontFamily="MaterialCommunityIcons"
          fontSize="2xl"
          color="twitter"
        />
      ) : (
        <Icon
          name="tag-plus-outline"
          fontFamily="MaterialCommunityIcons"
          fontSize="2xl"
        />
      )}
    </Button>
  );
};

const PhotoList: FC<{ media: MediaType[] }> = ({ media }) => {
  const { openModal } = useModalAction();

  const photosLength = media.length;

  const width = photosLength === 1 ? "100%" : "50%";
  const imageHeight = photosLength === 1 || photosLength === 2 ? 240 : 120;
  return (
    <>
      {media.map((photo, index) => (
        <Button
          key={index}
          mt="lg"
          bg="red300"
          px={0}
          h={imageHeight}
          w={photosLength === 3 && index === 2 ? "100%" : width}
          onPress={() =>
            openModal(PhotoModal, {
              photos: media,
              index,
            })
          }
        >
          <Image
            source={{ uri: photo.media_url_https }}
            w="100%"
            h={imageHeight}
            resizeMode="cover"
          />
        </Button>
      ))}
    </>
  );
};

export const Tweet: FC<TweetProps> = ({ tweet }) => {
  console.log("🚀 ~ file: Tweet.tsx ~ line 15 ~ openBottomSheet", tweet.id_str);

  return (
    <TouchableHighlight style={{ flex: 1 }}>
      <Div flex={1} w="100%" row borderBottomWidth={1} borderColor="selected">
        <Div flex={0.23} alignItems="center">
          <Image
            h={50}
            w={50}
            rounded="circle"
            mt="lg"
            source={{
              uri:
                "https://images.unsplash.com/photo-1593642532400-2682810df593?ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            }}
          />
        </Div>
        <Div flex={0.77}>
          <Div py="md">
            <Div row alignItems="center" justifyContent="space-between">
              <Div row alignItems="center" flex={1}>
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  maxW="70%"
                  numberOfLines={1}
                >
                  {tweet.user.displayName}
                </Text>
                <Text
                  ml="xs"
                  color="gray600"
                  style={{ flexShrink: 1 }}
                  numberOfLines={1}
                >
                  {`@${tweet.user.screenName}`}
                </Text>

                <Div ml="xs" style={{ flexShrink: 0 }}>
                  <Text color="gray600">2021/2/13</Text>
                </Div>
              </Div>
              <BottomSheetButton tweet={tweet} />
            </Div>

            <Div mt="sm" pr="xl">
              <Text>{tweet.full_text}</Text>
              {tweet.extended_entities?.media && (
                <Div row flexWrap="wrap" w="100%">
                  <PhotoList media={tweet.extended_entities.media} />
                </Div>
              )}
            </Div>

            <Div row mt="md">
              {/* <Div row alignItems="center">
                <Icon
                  name="chatbubble-outline"
                  fontFamily="Ionicons"
                  fontSize="3xl"
                  color="gray800"
                />
                <Text>12</Text>
              </Div>
              <Div row alignItems="center" ml="2xl">
                <Icon
                  name="twitter-retweet"
                  fontFamily="MaterialCommunityIcons"
                  fontSize="3xl"
                  color="gray800"
                />
                <Text>233</Text>
              </Div> */}
              {/* <Div row alignItems="center" ml="2xl">
                <Icon
                  name="favorite-outline"
                  fontFamily="MaterialIcons"
                  fontSize="3xl"
                  color="gray800"
                />
                <Text>3333</Text>
              </Div> */}
            </Div>
          </Div>
        </Div>
      </Div>
    </TouchableHighlight>
  );
};

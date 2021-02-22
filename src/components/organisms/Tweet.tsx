import React, { FC } from "react";
import { TouchableHighlight } from "react-native";
import { Div, Text, Button, Image, Icon } from "react-native-magnus";
import { Video } from "expo-av";
import { useBottomSheetAction } from "../../hooks/useBottomSheet/useBottomSheet";
import { useModalAction } from "../../hooks/useModal/useModalState";
import { useTagListState } from "../../hooks/useTagList/useTagList";
import { MediaType, TweetType } from "../../types/tweet";
import { PhotoModal } from "./Modal/PhotoModal";
import {
  getHighestBitrateUrl,
  getHighestImageQualityUrl,
} from "../../utils/twitter";
import { yyyyMMdd } from "../../lib/date-fns";

type TweetProps = {
  tweet: TweetType;
};

const BottomSheetButton: FC<TweetProps> = ({ tweet }) => {
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

const MediaList: FC<{ media: MediaType[] }> = ({ media }) => {
  const { openModal } = useModalAction();

  const photosLength = media.length;

  const width = photosLength === 1 ? "100%" : "50%";
  const imageHeight = photosLength === 1 || photosLength === 2 ? 240 : 120;
  return (
    <>
      {media.map((item, index) => (
        <React.Fragment key={index}>
          {item.type === "photo" ? (
            <Button
              mt="lg"
              bg="red300"
              px={0}
              h={imageHeight}
              w={photosLength === 3 && index === 2 ? "100%" : width}
              onPress={() =>
                openModal(PhotoModal, {
                  photos: media,
                  index,
                  isVisible: true,
                })
              }
            >
              <Image
                source={{ uri: item.media_url_https }}
                w="100%"
                h={imageHeight}
                resizeMode="cover"
              />
            </Button>
          ) : (
            <Video
              source={{
                uri: getHighestBitrateUrl(item?.video_info?.variants!),
              }}
              style={{ width: "100%", height: 180, marginTop: 12 }}
              resizeMode="contain"
              rate={1.0}
              volume={1.0}
              isMuted={false}
              useNativeControls
            />
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export const Tweet: FC<TweetProps> = ({ tweet }) => (
  <TouchableHighlight style={{ flex: 1 }}>
    <Div flex={1} w="100%" row borderBottomWidth={1} borderColor="selected">
      <Div flex={0.23} alignItems="center">
        <Image
          h={50}
          w={50}
          rounded="circle"
          mt="sm"
          source={{
            uri: getHighestImageQualityUrl(tweet.user.profile_image_url_https),
          }}
        />
      </Div>
      <Div flex={0.77}>
        <Div py="md">
          <Div row alignItems="center" justifyContent="space-between">
            <Div row alignItems="center" flex={1}>
              <Text fontWeight="bold" maxW="70%" numberOfLines={1}>
                {tweet.user.name}
              </Text>
              <Text
                ml="xs"
                color="gray600"
                style={{ flexShrink: 1 }}
                numberOfLines={1}
              >
                {`@${tweet.user.screen_name}`}
              </Text>

              <Div ml="xs" style={{ flexShrink: 0 }}>
                <Text color="gray600">{yyyyMMdd(tweet.created_at)}</Text>
              </Div>
            </Div>
            <BottomSheetButton tweet={tweet} />
          </Div>

          <Div mt="sm" pr="xl">
            <Text>{tweet.full_text}</Text>
            {tweet.extended_entities?.media && (
              <Div row flexWrap="wrap" w="100%">
                <MediaList media={tweet.extended_entities.media} />
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

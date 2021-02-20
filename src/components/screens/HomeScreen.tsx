import React, { FC, useState, useCallback, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { Div, Button, Icon, Input } from "react-native-magnus";
import { ThemeSwitcher } from "../atoms/ThemeSwitcher";
import { RootStackParamList } from "../../types/navigation";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { requestToken } from "../../apis";
import { TweetType } from "../../types/tweet";
import { TweetList } from "../organisms/TweetList";
import { useAuthAction } from "../../hooks/useAuth/useAuth";
import { useTwitter } from "../../lib/react-native-simple-twitter";

type HomeScreenProps = {
  navigation: DrawerNavigationProp<RootStackParamList, "Home">;
};

export const HomeScreen: FC<HomeScreenProps> = ({
  navigation,
}): JSX.Element => {
  const [tweets, setTweets] = useState({
    all: [] as TweetType[],
    tmp: [] as TweetType[],
  });
  const [keyword, setKeyword] = useState("");
  console.log("home");

  // const data: TweetType[] = [
  //   {
  //     id_str: "1",
  //     created_at: new Date(),
  //     user: {
  //       displayName: "むらさき",
  //       screenName: "purpleeeee",
  //     },
  //     full_text:
  //       "Lorem ipsum dolor sit amet, consectetur adipisicing elit Eveniet, odio? Rerum sequi ad quos, id aspernatur harum ipsa eius doloribus velit voluptatem nostrum, sint dolorem. Fugit natus ratione excepturi quis! Lorem ipsum dolor,sit ametconsectetur adipisicing elit. Numquam veritatis quis expeditaperspiciatis alias tenetur quisquam deserunt cupiditate errorearum. Amet quibusdam consequatur eligendi! Obcaecati, ducimusad! Facilis, tempore cupiditate",
  //   },
  //   {
  //     id_str: "2",
  //     created_at: new Date(),
  //     user: {
  //       displayName: "aka",
  //       screenName: "eeeee",
  //     },
  //     full_text: "hoegeho",
  //     extended_entities: {
  //       media: [
  //         {
  //           id: 1,
  //           id_str: "1",
  //           indices: [],
  //           media_url: "s",
  //           media_url_https: "s",
  //           url: "s",
  //           display_url: "s",
  //           expanded_url: "s",
  //           type: "video",
  //           sizes: {},
  //           video_info: {
  //             aspect_ratio: [1],
  //             duration_millis: 2,
  //             variants: [
  //               {
  //                 bitrate: 256000,
  //                 content_type: "video/mp4",
  //                 url:
  //                   "https://video.twimg.com/ext_tw_video/1362459448598437889/pu/vid/1280x720/MIlCNk8MBOhBr9Nj.mp4?tag=10",
  //               },
  //               {
  //                 bitrate: 832000,
  //                 content_type: "video/mp4",
  //                 url:
  //                   "https://video.twimg.com/ext_tw_video/1362459448598437889/pu/vid/1280x720/MIlCNk8MBOhBr9Nj.mp4?tag=10",
  //               },
  //             ],
  //           },
  //         },
  //         // {
  //         //   id: 1361216986403934200,
  //         //   id_str: "1361216986403934208",
  //         //   indices: [8, 31],
  //         //   media_url: "http://pbs.twimg.com/media/EuQDoxjVkAAj4VE.png",
  //         //   media_url_https: "https://pbs.twimg.com/media/EuQDoxjVkAAj4VE.png",
  //         //   url: "https://t.co/qxIn4MrGHc",
  //         //   display_url: "pic.twitter.com/qxIn4MrGHc",
  //         //   expanded_url:
  //         //     "https://twitter.com/marin_a___/status/1361216993609674755/photo/1",
  //         //   type: "photo",
  //         //   sizes: {},
  //         // },
  //       ],
  //     },
  //   },
  // ];

  const { auth, TWModal } = useAuthAction();
  const { getFavoriteTweets, getMoreFavoriteTweets } = useTwitter();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button onPress={() => navigation.openDrawer()}>
          <Icon
            name="menu"
            fontFamily="MaterialCommunityIcons"
            fontSize="4xl"
            color="twitter"
          />
        </Button>
      ),
    });
    // requestToken({
    //   callbackUrl:
    //     "https://tweetbookmark-823a9.firebaseapp.com/__/auth/handler",
    // })
    //   .then((result) => console.log(result))
    //   .catch((e) => console.log(e));
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

  const onEndReached = useCallback(() => {
    if (keyword.length) return;
    console.log(onEndReached);
    getMoreFavoriteTweets(tweets.all.slice(-1)[0].id_str).then(
      (res: TweetType[]) =>
        setTweets({
          all: [...tweets.all, ...res],
          tmp: [...tweets.tmp, ...res],
        })
    );
  }, [tweets, keyword]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Div flex={1}>
        <Div row>
          <ThemeSwitcher />
          <Button bg="blue200" onPress={auth}>
            hoge
          </Button>
          <Button
            bg="blue200"
            onPress={async () => {
              const hoge = await getFavoriteTweets();
              setTweets({ all: hoge, tmp: hoge });
            }}
          >
            foo
          </Button>
          <Button bg="red400" onPress={onEndReached}>
            more
          </Button>
        </Div>
        <Input
          // textAlign="center"
          borderBottomWidth={1}
          placeholder="キーワード検索"
          autoCapitalize="none"
          prefix={
            <Icon name="search" fontFamily="MaterialIcons" fontSize="2xl" />
          }
          value={keyword}
          onChangeText={filterTweetByKeyword}
        />
        <TweetList tweets={tweets.all} onEndReached={onEndReached} />
      </Div>

      <TWModal />
    </SafeAreaView>
  );
};

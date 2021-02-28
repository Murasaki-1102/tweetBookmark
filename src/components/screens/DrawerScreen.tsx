import React, { FC, useState, useEffect } from "react";
import { SafeAreaView, Alert } from "react-native";
import { Div, Button, Image, Text, Icon, useTheme } from "react-native-magnus";
import { drawerMenu } from "../../constants/drawerMenu";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import { useAuthAction, useAuthState } from "../../hooks/useAuth/useAuth";
import { getHighestImageQualityUrl } from "../../utils/twitter";
import { useTwitter } from "../../lib/react-native-simple-twitter";

type DrawerScreenProps = {
  navigation: DrawerNavigationHelpers;
};

const LimitStatus = () => {
  // Fix
  const [limitStatus, setLimitStatus] = useState({} as any);
  const { getRateLimitStatus } = useTwitter();
  useEffect(() => {
    (async () => {
      const status = await getRateLimitStatus();
      setLimitStatus(status.resources.favorites["/favorites/list"]);
    })();
  }, []);

  return <Text ml="sm">{limitStatus.remaining === 0 ? "制限中" : "正常"}</Text>;
};

export const DrawerScreen: FC<DrawerScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { user } = useAuthState();
  const { auth, TWModal, logout } = useAuthAction();

  // TypeError: Invalid attempt to spread non-iterable instance.　FIX予定
  const onPressAccountSetting = () =>
    Alert.alert(
      "アカウントを変更しますか？",
      "ログアウトしてもデータは消えません。再度ログインすることで利用できます。",
      [
        { text: "いいえ", style: "cancel" },
        {
          text: "はい",
          style: "destructive",
          onPress: () => {
            // logout();
            auth();
          },
        },
      ]
    );

  // TypeError: Invalid attempt to spread non-iterable instance.　FIX予定
  const onPressLogout = () =>
    Alert.alert(
      "ログアウトしますか？",
      "ログアウトしてもデータは消えません。再度ログインすることで利用できます。",
      [
        { text: "いいえ", style: "cancel" },
        {
          text: "はい",
          style: "destructive",
          onPress: () => {
            logout();
          },
        },
      ]
    );

  return (
    <>
      <SafeAreaView style={{ backgroundColor: theme.colors?.body }} />
      <Div h="100%" py="xl">
        <Div px="xl">
          <Image
            h={50}
            w={50}
            rounded="circle"
            source={{
              uri: getHighestImageQualityUrl(user?.photoUrl!),
            }}
          />
          <Text mt="lg" fontWeight="bold" fontSize="xl">
            {user?.name}
          </Text>
        </Div>

        <Div py="xl">
          {drawerMenu.map((item, index) => (
            <Button
              key={index}
              block
              px="xl"
              justifyContent="flex-start"
              color="text"
              fontSize="2xl"
              prefix={
                <Icon
                  name={item.icon}
                  fontFamily="MaterialCommunityIcons"
                  fontSize="6xl"
                  mr="lg"
                />
              }
              onPress={() =>
                item.icon === "account"
                  ? onPressAccountSetting()
                  : navigation.navigate(item.navigate)
              }
            >
              {item.name}
            </Button>
          ))}
        </Div>

        <Div borderBottomWidth={1} borderColor="selected" my="lg" />

        <Div py="md">
          <Div row px="xl" alignItems="center">
            <Text>Twitter API :</Text>
            <LimitStatus />
          </Div>
          <Button
            block
            mt="lg"
            px="xl"
            justifyContent="flex-start"
            onPress={onPressLogout}
          >
            <Text color="text" fontSize="xl">
              ログアウト
            </Text>
          </Button>
        </Div>

        <TWModal closeText="閉じる" />
      </Div>
    </>
  );
};

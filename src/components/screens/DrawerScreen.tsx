import React, { FC } from "react";
import { SafeAreaView, Alert } from "react-native";
import { Div, Button, Image, Text, Icon, useTheme } from "react-native-magnus";
import { drawerMenu } from "../../constants/drawerMenu";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import { useAuthAction } from "../../hooks/useAuth/useAuth";

type DrawerScreenProps = {
  navigation: DrawerNavigationHelpers;
};

export const DrawerScreen: FC<DrawerScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  console.log("🚀 ~ file: DrawerScreen.tsx ~ line 13 ~ theme");
  const { auth, TWModal, logout } = useAuthAction();

  const onPressLogout = () => {
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
  };

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
              uri:
                "https://images.unsplash.com/photo-1593642532400-2682810df593?ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            }}
          />
          <Text mt="lg" fontWeight="bold" fontSize="xl">
            むらさき
          </Text>
          <Text mt="xs" color="gray600">
            @hogehoge
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
              onPress={() => navigation.navigate(item.navigate)}
            >
              {item.name}
            </Button>
          ))}
        </Div>

        <Div borderBottomWidth={1} borderColor="selected" my="lg" />

        <Div py="md">
          <Button
            block
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

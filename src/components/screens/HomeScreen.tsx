import React, { FC, useEffect } from "react";
import { SafeAreaView, FlatList } from "react-native";
import { Div, Button, Icon } from "react-native-magnus";
import { ThemeSwitcher } from "../atoms/ThemeSwitcher";
import { Tweet } from "../organisms/Tweet";
import { BottomSheet } from "../organisms/BottomSheet";
import { RootStackParamList } from "../../types/navigation";
import { DrawerNavigationProp } from "@react-navigation/drawer";

type HomeScreenProps = {
  navigation: DrawerNavigationProp<RootStackParamList, "Home">;
};

export const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const data = ["", "", "", "", "", ""];
  const renderItem = () => <Tweet />;

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
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Div flex={1}>
        <ThemeSwitcher />
        <FlatList data={data} renderItem={renderItem} />
      </Div>
      <BottomSheet />
    </SafeAreaView>
  );
};

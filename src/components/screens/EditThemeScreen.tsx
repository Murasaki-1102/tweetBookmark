import React from "react";
import { SafeAreaView } from "react-native";
import { Div, Button, Text } from "react-native-magnus";
import { ThemeSwitcher } from "../atoms/ThemeSwitcher";

export const EditThemeScreen = () => {
  return (
    <SafeAreaView>
      <Div h="100%">
        <Button
          block
          rounded="none"
          borderBottomWidth={1}
          borderColor="selected"
          suffix={<ThemeSwitcher />}
        >
          <Text fontSize="2xl" w="85%">
            ダークテーマに変更する
          </Text>
        </Button>
      </Div>
    </SafeAreaView>
  );
};

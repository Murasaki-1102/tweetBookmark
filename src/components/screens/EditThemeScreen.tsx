import React from "react";
import { SafeAreaView } from "react-native";
import { Div } from "react-native-magnus";
import { ThemeSwitcher } from "../atoms/ThemeSwitcher";

export const EditThemeScreen = () => {
  return (
    <SafeAreaView>
      <Div h="100%">
        <ThemeSwitcher />
      </Div>
    </SafeAreaView>
  );
};

import { StatusBar } from "expo-status-bar";
import React from "react";

import { Div, Button, Text, Icon } from "react-native-magnus";
import { ThemeSwitcher } from "../atoms/ThemeSwitcher";

export const App = () => {
  return (
    <Div bg="twitter" justifyContent="center" alignItems="center" flex={1}>
      <ThemeSwitcher />
      <Button bg="gray800" alignSelf="center">
        hoge
      </Button>
      <Text fontSize="2xl" color="text">
        hoge
      </Text>
      <Button
        bg="red100"
        rounded="circle"
        alignSelf="center"
        shadow="md"
        borderless
      >
        <Icon name="heart" color="red500" fontSize="6xl" />
      </Button>
      <StatusBar style="auto" />
    </Div>
  );
};

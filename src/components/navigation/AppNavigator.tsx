import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackNavigator } from "./RootStackNavigator";

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
};

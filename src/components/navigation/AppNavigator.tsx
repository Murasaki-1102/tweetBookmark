import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackNavigator } from "./RootStackNavigator";
import { ModalManager } from "../molecules/ModalManager";

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStackNavigator />
      <ModalManager />
    </NavigationContainer>
  );
};

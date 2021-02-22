import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackNavigator } from "./RootStackNavigator";
import { ModalManager } from "../molecules/ModalManager";
import { BottomSheet } from "../organisms/BottomSheet";

export const AppNavigator = () => (
  <NavigationContainer>
    <RootStackNavigator />
    <ModalManager />
    <BottomSheet />
  </NavigationContainer>
);

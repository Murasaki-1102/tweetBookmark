import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackNavigator } from "./RootStackNavigator";
import { ModalManager } from "../molecules/ModalManager";
import { BottomSheet } from "../organisms/BottomSheet";
import { useTagListAction } from "../../hooks/useTagList/useTagList";

export const AppNavigator = () => {
  const { getTagList } = useTagListAction();

  useEffect(() => {
    getTagList();
  });

  return (
    <NavigationContainer>
      <RootStackNavigator />
      <ModalManager />
      <BottomSheet />
    </NavigationContainer>
  );
};

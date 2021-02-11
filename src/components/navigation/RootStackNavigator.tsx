import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerNavigator } from "./DrawerNavigator";
import { EditTagModalScreen } from "../screens/EditTagModalScreen";

const RootStack = createStackNavigator();

export const RootStackNavigator = () => {
  return (
    <RootStack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Main" component={DrawerNavigator} />
      <RootStack.Screen name="EditTagModal" component={EditTagModalScreen} />
    </RootStack.Navigator>
  );
};

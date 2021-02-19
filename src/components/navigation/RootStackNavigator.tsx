import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerNavigator } from "./DrawerNavigator";

const RootStack = createStackNavigator();

export const RootStackNavigator = () => {
  return (
    <RootStack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Main" component={DrawerNavigator} />
    </RootStack.Navigator>
  );
};

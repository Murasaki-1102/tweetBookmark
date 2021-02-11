import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerScreen } from "../screens/DrawerScreen";
import { BottomTabNavigator } from "./BottomTabNavigator";

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerType="slide"
      drawerStyle={{ width: "72%" }}
      drawerContent={(props) => <DrawerScreen navigation={props.navigation} />}
    >
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
};

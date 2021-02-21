import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerScreen } from "../screens/DrawerScreen";
import { BottomTabNavigator } from "./BottomTabNavigator";
import { RootStackParamList } from "../../types/navigation";

const Drawer = createDrawerNavigator<RootStackParamList>();

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

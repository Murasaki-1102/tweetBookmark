import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerNavigator } from "./DrawerNavigator";
import { useAuthState } from "../../hooks/useAuth/useAuth";
import { AuthScreen } from "../screens/AuthScreen";

const RootStack = createStackNavigator();

export const RootStackNavigator = () => {
  const { user } = useAuthState();

  return (
    <RootStack.Navigator screenOptions={{ headerShown: user ? false : true }}>
      {!user ? (
        <RootStack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ title: "Tweet Bookmark" }}
        />
      ) : (
        <RootStack.Screen name="Main" component={DrawerNavigator} />
      )}
    </RootStack.Navigator>
  );
};

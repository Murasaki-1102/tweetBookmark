import React from "react";
import { createStackNavigator, Header } from "@react-navigation/stack";
import { useTheme, StatusBar } from "react-native-magnus";
import { DrawerNavigator } from "./DrawerNavigator";
import { useAuthState } from "../../hooks/useAuth/useAuth";
import { AuthScreen } from "../screens/AuthScreen";

const RootStack = createStackNavigator();

export const RootStackNavigator = () => {
  const { user } = useAuthState();
  const { theme } = useTheme();

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: user ? false : true,
        headerStyle: { backgroundColor: theme.colors?.body },
        headerTintColor: theme.colors?.text,
        header: (props) => (
          <>
            <StatusBar
              barStyle={
                theme.name === "light" ? "dark-content" : "light-content"
              }
            />

            <Header {...props} />
          </>
        ),
      }}
    >
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

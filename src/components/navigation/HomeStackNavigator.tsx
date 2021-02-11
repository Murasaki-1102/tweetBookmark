import React from "react";
import { createStackNavigator, Header } from "@react-navigation/stack";
import { HomeScreen } from "../screens/HomeScreen";
import { StatusBar, useTheme } from "react-native-magnus";
import { EditThemeScreen } from "../screens/EditThemeScreen";

const Stack = createStackNavigator();

export const HomeStackNavigator = () => {
  const { theme } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors?.body,
          shadowColor: theme.colors?.gray500,
        },
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
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="EditTheme"
        component={EditThemeScreen}
        options={{ title: "テーマの変更" }}
      />
    </Stack.Navigator>
  );
};

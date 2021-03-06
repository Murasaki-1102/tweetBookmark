import React from "react";
import { createStackNavigator, Header } from "@react-navigation/stack";
import { HomeScreen } from "../screens/HomeScreen";
import { StatusBar, useTheme, Icon } from "react-native-magnus";
import { EditThemeScreen } from "../screens/EditThemeScreen";
import { RootStackParamList } from "../../types/navigation";
import { HelpScreen } from "../screens/HelpScreen";

const Stack = createStackNavigator<RootStackParamList>();

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
        headerBackImage: () => (
          <Icon
            name="arrow-back-ios"
            fontFamily="MaterialIcons"
            fontSize="4xl"
            color="twitter"
            ml="lg"
          />
        ),
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "いいねしたツイート" }}
      />
      <Stack.Screen
        name="EditTheme"
        component={EditThemeScreen}
        options={{ title: "テーマの変更" }}
      />
      <Stack.Screen
        name="Help"
        component={HelpScreen}
        options={{ title: "お問い合わせ" }}
      />
    </Stack.Navigator>
  );
};

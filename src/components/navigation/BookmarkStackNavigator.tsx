import React from "react";
import { createStackNavigator, Header } from "@react-navigation/stack";
import { TagListScreen } from "../screens/TagListScreen";
import { RootStackParamList } from "../../types/navigation";
import { TagDetailScreen } from "../screens/TagDetailScreen";
import { EditThemeScreen } from "../screens/EditThemeScreen";
import { StatusBar, useTheme } from "react-native-magnus";

const Stack = createStackNavigator<RootStackParamList>();

export const BookmarkStackNavigator = () => {
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
      <Stack.Screen name="TagList" component={TagListScreen} />
      <Stack.Screen name="TagDetail" component={TagDetailScreen} />
      <Stack.Screen
        name="EditTheme"
        component={EditThemeScreen}
        options={{ title: "テーマの変更" }}
      />
    </Stack.Navigator>
  );
};

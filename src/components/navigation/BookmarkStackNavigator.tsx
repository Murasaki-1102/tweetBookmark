import React from "react";
import { createStackNavigator, Header } from "@react-navigation/stack";
import { TagListScreen } from "../screens/TagListScreen";
import { RootStackParamList } from "../../types/navigation";
import { TagDetailScreen } from "../screens/TagDetailScreen";
import { StatusBar, useTheme, Icon } from "react-native-magnus";

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
        name="TagList"
        component={TagListScreen}
        options={{ headerTitle: "ブックマーク" }}
      />
      <Stack.Screen name="TagDetail" component={TagDetailScreen} />
    </Stack.Navigator>
  );
};

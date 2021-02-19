import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeStackNavigator } from "./HomeStackNavigator";
import { BookmarkStackNavigator } from "./BookmarkStackNavigator";
import { Icon, useTheme } from "react-native-magnus";

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  const { theme } = useTheme();
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: theme.colors?.body,
          shadowColor: theme.colors?.gray500,
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Icon
              name={route.name === "Home" ? "home-heart" : "bookmark-check"}
              fontFamily="MaterialCommunityIcons"
              color={focused ? "twitter" : "gray500"}
              fontSize="4xl"
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Bookmark" component={BookmarkStackNavigator} />
    </Tab.Navigator>
  );
};

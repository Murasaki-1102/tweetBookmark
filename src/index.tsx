import React from "react";
import { registerRootComponent } from "expo";
import { ThemeProvider } from "react-native-magnus";
import { themes } from "./constants/theme";
import { AppNavigator } from "./components/navigation/AppNavigator";
import { TagProvider } from "./components/contexts/TagContext";

const Main = () => (
  <ThemeProvider theme={themes.light}>
    <TagProvider>
      <AppNavigator />
    </TagProvider>
  </ThemeProvider>
);

registerRootComponent(Main);

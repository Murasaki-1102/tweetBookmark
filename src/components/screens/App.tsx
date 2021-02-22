import React, { useState, useEffect } from "react";
import { useTheme } from "react-native-magnus";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppNavigator } from "../navigation/AppNavigator";
import { themes } from "../../constants/theme";

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { setTheme } = useTheme();

  useEffect(() => {
    (async () => {
      const themeName = await AsyncStorage.getItem("@theme");
      setTheme(themeName === "dark" ? themes.dark : themes.light);
      setIsLoading(false);
    })();
  }, []);

  return isLoading ? null : <AppNavigator />;
};

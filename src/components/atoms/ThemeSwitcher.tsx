import React from "react";
import { Toggle, ToggleProps, useTheme } from "react-native-magnus";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { themes } from "../../constants/theme";

export const ThemeSwitcher = (props?: Omit<ToggleProps, "onPress">) => {
  const { theme, setTheme } = useTheme();
  const onToggle = () => {
    if (theme.name === "dark") {
      setTheme(themes.light);
      AsyncStorage.setItem("@theme", "light");
    } else {
      setTheme(themes.dark);
      AsyncStorage.setItem("@theme", "dark");
    }
  };

  return (
    <Toggle
      on={theme.name === "dark"}
      onPress={onToggle}
      activeBg="gray700"
      {...props}
    />
  );
};

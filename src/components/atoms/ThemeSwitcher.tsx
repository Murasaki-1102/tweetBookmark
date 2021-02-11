import React, { useContext } from "react";
import { Toggle, ThemeContext, useTheme } from "react-native-magnus";

import { themes } from "../../constants/theme";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  console.log(theme);
  const onToggle = () => {
    theme.name === "dark" ? setTheme(themes.light) : setTheme(themes.dark);
  };

  return <Toggle on={theme.name === "dark"} onPress={onToggle} />;
};

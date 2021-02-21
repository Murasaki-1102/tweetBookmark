import React from "react";
import { Toggle, ToggleProps, useTheme } from "react-native-magnus";
import { themes } from "../../constants/theme";

export const ThemeSwitcher = (props?: Omit<ToggleProps, "onPress">) => {
  const { theme, setTheme } = useTheme();
  const onToggle = () => {
    theme.name === "dark" ? setTheme(themes.light) : setTheme(themes.dark);
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

import { ThemeType } from "react-native-magnus";

const commonComponents: ThemeType["components"] = {
  Div: {
    bg: "body",
  },
  Text: {
    fontSize: "lg",
    color: "text",
  },
  Button: {
    bg: "body",
  },
};

type Themes = {
  light: ThemeType;
  dark: ThemeType;
};

export const themes: Themes = {
  light: {
    name: "light",
    components: commonComponents,
    colors: {
      body: "#f7fafc",
      text: "#1a202c",
      selected: "#e2e8f0",
      twitter: "#1DA1F2",
    },
  },
  dark: {
    name: "dark",
    components: commonComponents,
    colors: {
      body: "#1a202c",
      text: "#f7fafc",
      selected: "#2d3748",
      twitter: "#1DA1F2",
    },
  },
};

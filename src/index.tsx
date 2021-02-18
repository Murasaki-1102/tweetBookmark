import React from "react";
import { registerRootComponent } from "expo";
import { ThemeProvider } from "react-native-magnus";
import { themes } from "./constants/theme";
import { AuthProvider } from "./components/contexts/AuthContext";
import { BottomSheetProvider } from "./components/contexts/BottomSheetContext";
import { TagListProvider } from "./components/contexts/TagListContext";
import { App } from "./components/screens/App";

const Main = () => {
  return (
    <ThemeProvider theme={themes.light}>
      <AuthProvider>
        <TagListProvider>
          <BottomSheetProvider>
            <App />
          </BottomSheetProvider>
        </TagListProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

registerRootComponent(Main);

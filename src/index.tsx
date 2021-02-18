import React from "react";
import { registerRootComponent } from "expo";
import { ThemeProvider } from "react-native-magnus";
import { themes } from "./constants/theme";
import { TagProvider } from "./components/contexts/TagContext";
import { AuthProvider } from "./components/contexts/AuthContext";
import { BottomSheetProvider } from "./components/contexts/BottomSheetContext";
import { RecoilRoot } from "recoil";

import whyDidYouRender from "@welldone-software/why-did-you-render";
import { App } from "./components/screens/App";
import { TagListProvider } from "./components/contexts/TagListContext";

const Main = () => {
  // whyDidYouRender(React, { trackAllPureComponents: true });
  return (
    <ThemeProvider theme={themes.light}>
      <RecoilRoot>
        <AuthProvider>
          <TagListProvider>
            <TagProvider>
              <BottomSheetProvider>
                <App />
              </BottomSheetProvider>
            </TagProvider>
          </TagListProvider>
        </AuthProvider>
      </RecoilRoot>
    </ThemeProvider>
  );
};

registerRootComponent(Main);

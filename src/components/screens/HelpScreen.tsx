import React, { FC } from "react";
import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

export const HelpScreen: FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{ uri: "https://forms.gle/w58k3y5pAhE9npBg8" }}
        startInLoadingState
      />
    </SafeAreaView>
  );
};

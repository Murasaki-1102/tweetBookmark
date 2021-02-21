import React, { useState } from "react";
import { SafeAreaView, ActivityIndicator } from "react-native";
import { Button, Div, useTheme } from "react-native-magnus";
import { useAuthAction } from "../../hooks/useAuth/useAuth";

export const AuthScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { auth, TWModal } = useAuthAction();
  const { theme } = useTheme();

  const signIn = () => {
    setIsLoading(true);
    auth();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors?.body }}>
      <Div flex={1} justifyContent="center">
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Button bg="twitter" alignSelf="center" onPress={signIn}>
            ログインする
          </Button>
        )}
      </Div>
      <TWModal closeText="閉じる" renderHeader={() => null} />
    </SafeAreaView>
  );
};

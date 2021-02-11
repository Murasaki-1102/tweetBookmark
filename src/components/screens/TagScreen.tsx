import React, { FC, useEffect } from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView, KeyboardAvoidingView } from "react-native";
import { Div, Text, Button, Icon, Modal, Input } from "react-native-magnus";
import { RootStackParamList } from "../../types/navigation";

type TagScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Tag">;
  route: RouteProp<RootStackParamList, "Tag">;
};

export const TagScreen: FC<TagScreenProps> = ({ route, navigation }) => {
  const { tag } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: tag.name });
  }, [tag]);
  return (
    <SafeAreaView>
      <Div>
        <Button>{tag.name}</Button>
      </Div>
    </SafeAreaView>
  );
};

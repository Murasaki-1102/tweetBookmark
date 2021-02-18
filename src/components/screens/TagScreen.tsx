import React, { FC, useEffect } from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView, KeyboardAvoidingView } from "react-native";
import { Div, Text, Button, Icon, Modal, Input } from "react-native-magnus";
import { RootStackParamList } from "../../types/navigation";
import { useTagListState } from "../../hooks/useTagList/useTagList";

type TagScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Tag">;
  route: RouteProp<RootStackParamList, "Tag">;
};

export const TagScreen: FC<TagScreenProps> = ({ route, navigation }) => {
  const { id } = route.params;
  const { tagList } = useTagListState();
  //Non-serializable対策
  const tag = tagList.find((tag) => tag.id === id);

  useEffect(() => {
    navigation.setOptions({ title: tag?.name });
  }, [tag?.name]);

  return (
    <SafeAreaView>
      <Div>
        <Button bg="blue300">{tag?.name}</Button>
      </Div>
    </SafeAreaView>
  );
};

import React, { FC, useContext, useEffect } from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView, KeyboardAvoidingView } from "react-native";
import { Div, Text, Button, Icon, Modal, Input } from "react-native-magnus";
import { RootStackParamList } from "../../types/navigation";
import { TagContext } from "../contexts/TagContext";

type TagScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Tag">;
  route: RouteProp<RootStackParamList, "Tag">;
};

export const TagScreen: FC<TagScreenProps> = ({ route, navigation }) => {
  const { id } = route.params;
  const { tags } = useContext(TagContext);
  //Non-serializable対策
  const tag = tags.find((tag) => tag.id === id);

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

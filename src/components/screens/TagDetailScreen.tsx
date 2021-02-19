import React, { FC, useEffect } from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView, LogBox } from "react-native";
import { Div, Button } from "react-native-magnus";
import { RootStackParamList } from "../../types/navigation";

type TagDetailScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "TagDetail">;
  route: RouteProp<RootStackParamList, "TagDetail">;
};

export const TagDetailScreen: FC<TagDetailScreenProps> = ({
  route,
  navigation,
}) => {
  //Non-serializable対策
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation >state",
  ]);
  const { tag } = route.params;
  console.log("🚀 ~ file: TagDetailScreen.tsx ~ line 19 ~ tag", tag);
  // const { tagList } = useTagListState();
  //Non-serializable対策
  // const tag = tagList.find((tag) => tag.id === id);

  useEffect(() => {
    navigation.setOptions({ title: tag.name });
  }, [tag.name]);

  return (
    <SafeAreaView>
      <Div>
        <Button bg="blue300">{tag?.name}</Button>
      </Div>
    </SafeAreaView>
  );
};

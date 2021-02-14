import React, { FC, useContext, useEffect } from "react";
import { SafeAreaView, FlatList } from "react-native";
import { Div, Button, Icon, Text } from "react-native-magnus";
import { TagContext } from "../contexts/TagContext";
import { RootStackParamList } from "../../types/navigation";
import { TagButton } from "../organisms/TagButton";
import { Tag } from "../../types/tag";
import { DrawerNavigationProp } from "@react-navigation/drawer";

type BookmarkScreenProps = {
  navigation: DrawerNavigationProp<RootStackParamList, "Bookmark">;
};

export const BookmarkScreen: FC<BookmarkScreenProps> = ({ navigation }) => {
  const { tags, getTags } = useContext(TagContext);

  const onPressModalOpen = () => {
    navigation.navigate("EditTagModal");
  };

  const onPress = (tag: Tag) => {
    navigation.navigate("Tag", { tag });
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button onPress={() => navigation.openDrawer()}>
          <Icon
            name="menu"
            fontFamily="MaterialCommunityIcons"
            fontSize="4xl"
            color="twitter"
          />
        </Button>
      ),
    });
  }, []);

  useEffect(() => {
    getTags();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Div flex={1}>
        <FlatList
          data={tags}
          ListHeaderComponent={
            <>
              <Button
                flex={1}
                maxH={80}
                block
                rounded="none"
                justifyContent="flex-start"
                borderBottomWidth={1}
                borderColor="selected"
                mb="sm"
                prefix={
                  <Icon
                    name="add"
                    fontFamily="MaterialIcons"
                    fontSize="6xl"
                    bg="selected"
                    rounded="md"
                    p={12}
                    mr="lg"
                  />
                }
                onPress={onPressModalOpen}
              >
                <Text fontSize="2xl">タグを作成</Text>
              </Button>
            </>
          }
          renderItem={({ item, index }) => (
            <TagButton key={index} onPress={() => onPress(item)} tag={item} />
          )}
        />
      </Div>
    </SafeAreaView>
  );
};

import React, { FC, useCallback, useContext, useEffect } from "react";
import { SafeAreaView, Alert } from "react-native";
import { Div, Button, Icon, Text } from "react-native-magnus";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import DraggableFlatList, {
  DragEndParams,
} from "react-native-draggable-flatlist";
import SwipeableItem from "react-native-swipeable-item";
import { TagContext } from "../contexts/TagContext";
import { RootStackParamList } from "../../types/navigation";
import { TagButton } from "../organisms/TagButton";
import { Tag } from "../../types/tag";
import firebase from "../../lib/firebase";

type BookmarkScreenProps = {
  navigation: DrawerNavigationProp<RootStackParamList, "Bookmark">;
};

export const BookmarkScreen: FC<BookmarkScreenProps> = ({ navigation }) => {
  const { tags, setTags, getTags } = useContext(TagContext);
  const { currentUser } = firebase.auth();

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

  const onPressModalOpen = () => {
    navigation.navigate("EditTagModal");
  };

  const onPressTag = (id: string) => {
    navigation.navigate("Tag", { id });
  };

  const onPressDelete = async (id: string, callback: () => Promise<void>) => {
    Alert.alert("タグを削除します", "よろしいですか？", [
      { text: "キャンセル" },
      {
        text: "削除する",
        style: "destructive",
        onPress: () => {
          firebase
            .firestore()
            .collection(`users/${currentUser?.uid}/tags`)
            .doc(id)
            .delete()
            .then(() => callback())
            .catch((error) => console.log(error));
        },
      },
    ]);
  };

  const onDragEnd = async (params: DragEndParams<Tag>) => {
    const draggedTags: Tag[] = params.data.map((tag, index) => {
      return { ...tag, index };
    });
    await setTags(draggedTags);
    const batch = firebase.firestore().batch();
    const tagsDocRef = await firebase
      .firestore()
      .collection(`users/${currentUser?.uid}/tags`)
      .get();
    await tagsDocRef.docs.map((tag) => {
      const afterIndex = draggedTags.find(
        (draggedTag) => draggedTag.id === tag.id
      )?.index;

      batch.update(tag.ref, { index: afterIndex });
    });

    await batch.commit();
  };

  const renderItem = useCallback(
    ({ item, index, drag }) => (
      <SwipeableItem
        key={index}
        item={item}
        snapPointsLeft={[80]}
        renderUnderlayLeft={({ close }) => (
          <Button
            bg="red600"
            h="100%"
            rounded="none"
            alignSelf="flex-end"
            onPress={() => {
              onPressDelete(item.id, close);
            }}
          >
            <Text color="white">削除する</Text>
          </Button>
        )}
        overSwipe={20}
      >
        <TagButton
          tag={item}
          onPress={() => onPressTag(item.id)}
          onLongPress={drag}
        />
      </SwipeableItem>
    ),
    []
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Div flex={1}>
        <DraggableFlatList
          data={tags}
          keyExtractor={(_, index) => `draggable-item-${index}`}
          ListHeaderComponent={
            <Button
              flex={1}
              maxH={80}
              block
              rounded="none"
              justifyContent="flex-start"
              borderBottomWidth={1}
              borderColor="selected"
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
          }
          renderItem={renderItem}
          onDragEnd={onDragEnd}
          activationDistance={20}
        />
      </Div>
    </SafeAreaView>
  );
};

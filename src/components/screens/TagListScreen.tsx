import React, { FC, useCallback, useEffect } from "react";
import { SafeAreaView, Alert } from "react-native";
import { Div, Button, Icon, Text } from "react-native-magnus";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import DraggableFlatList, {
  DragEndParams,
} from "react-native-draggable-flatlist";
import SwipeableItem from "react-native-swipeable-item";
import { RootStackParamList } from "../../types/navigation";
import { TagButton } from "../organisms/TagButton";
import { Tag } from "../../types/tag";
import firebase from "../../lib/firebase";

import {
  useTagListAction,
  useTagListState,
} from "../../hooks/useTagList/useTagList";
import { useModalAction } from "../../hooks/useModal/useModalState";
import { EditTagModal } from "../organisms/Modal/EditTagModal";

type TagListScreenProps = {
  navigation: DrawerNavigationProp<RootStackParamList, "TagList">;
};

export const TagListScreen: FC<TagListScreenProps> = ({ navigation }) => {
  const { tagList } = useTagListState();
  const { setTagList, getTagList, deleteTagById } = useTagListAction();
  const { openModal } = useModalAction();

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

  console.log("TagList", deleteTagById);

  useEffect(() => {
    getTagList();
  }, []);

  const onPressModalOpen = () => {
    openModal(EditTagModal);
  };

  const onPressTag = (id: string) => {
    navigation.navigate("TagDetail", { id });
  };

  const onPressDelete = async (id: string, callback: () => Promise<void>) => {
    Alert.alert("タグを削除します", "よろしいですか？", [
      { text: "キャンセル" },
      {
        text: "削除する",
        style: "destructive",
        onPress: () => {
          deleteTagById(id, callback);
        },
      },
    ]);
  };

  const onDragEnd = async (params: DragEndParams<Tag>) => {
    const draggedTags: Tag[] = params.data.map((tag, index) => {
      return { ...tag, index };
    });
    //これがないとチラつく
    await setTagList(draggedTags);
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
        snapPointsLeft={[160]}
        renderUnderlayLeft={({ item, close }) => (
          <Div h="100%" row justifyContent="flex-end">
            <Button
              bg="green500"
              h="100%"
              rounded="none"
              onPress={() => {
                openModal(EditTagModal, { id: item.id });
                close();
              }}
            >
              <Icon
                name="square-edit-outline"
                fontFamily="MaterialCommunityIcons"
                fontSize="6xl"
                px="lg"
                color="white"
              />
            </Button>
            <Button
              bg="red600"
              h="100%"
              rounded="none"
              onPress={() => {
                onPressDelete(item.id, close);
              }}
            >
              <Icon
                name="trash-can-outline"
                fontFamily="MaterialCommunityIcons"
                fontSize="6xl"
                px="lg"
                color="white"
              />
            </Button>
          </Div>
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
        <Button bg="blue300" onPress={getTagList}>
          a
        </Button>
        <DraggableFlatList
          data={tagList}
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

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { SafeAreaView } from "react-native";
import { Button, Text, Div, Icon, useTheme } from "react-native-magnus";
import { Modalize } from "react-native-modalize";
import { Tag } from "../../types/tag";
import firebase from "../../lib/firebase";
import { useBottomSheetState } from "../../hooks/useBottomSheet/useBottomSheet";
import { useModalAction } from "../../hooks/useModal/useModalState";
import { EditTagModal } from "./Modal/EditTagModal";
import { useTagListState } from "../../hooks/useTagList/useTagList";
import { useAuthState } from "../../hooks/useAuth/useAuth";

export const BottomSheet = () => {
  const [selectTagsId, setSelectedTagsId] = useState<string[]>([]);
  const { tagList } = useTagListState();

  console.log("🚀 ~ file: BottomSheet.tsx ~ line 16 ~ BottomSheet");

  const { selectedTweet, modalizeRef } = useBottomSheetState();
  const { user } = useAuthState();
  const { theme } = useTheme();

  useEffect(() => {
    const filteredHasTweetTagsId = tagList.filter((t) => t.tweets.length !== 0);
    const selectedTagsId = filteredHasTweetTagsId
      .map((t) => {
        if (t.tweets.filter((t) => t.id_str === selectedTweet.id_str).length) {
          return t.id;
        }
      })
      .filter((id) => id !== undefined);

    const initialSelectedTags = [...selectedTagsId];
    setSelectedTagsId([...(initialSelectedTags as string[])]);
  }, [selectedTweet, tagList]);

  const handleChange = (id: string) => {
    const isSelected = selectTagsId.includes(id);
    if (isSelected) {
      setSelectedTagsId(selectTagsId.filter((i) => i !== id));
    } else {
      setSelectedTagsId([...selectTagsId, id]);
    }
  };

  const onSubmit = async () => {
    const db = firebase.firestore();
    const batch = db.batch();
    const tagsDocRefs = selectTagsId.map((tagId) =>
      firebase.firestore().collection(`users/${user?.uid}/tags/${tagId}/tweets`)
    );
    await tagsDocRefs.forEach((tagsDocRef) =>
      tagsDocRef.doc(selectedTweet.id_str).set({
        tweet: selectedTweet,
        tagsId: selectTagsId,
        createdAt: new Date(),
      })
    );
    const tagsDocRef = await firebase
      .firestore()
      .collection(`users/${user?.uid}/tags`)
      .where(firebase.firestore.FieldPath.documentId(), "in", selectTagsId)
      .get();

    await tagsDocRef.docs.map((tag) => {
      if (true) {
        batch.update(tag.ref, {
          tweets: firebase.firestore.FieldValue.arrayUnion(selectedTweet),
        });
      }
    });
    db.collection(`users/${user?.uid}/tweets`)
      .doc(selectedTweet.id_str)
      .set({
        tweet: selectedTweet,
        tagsId: selectTagsId,
        createdAt: new Date(),
      })
      .catch((error) => console.log(error));
    await batch.commit();

    modalizeRef.current?.close();
  };

  const renderItem = useCallback(
    ({ item, index }: { item: Tag; index: number }) => {
      const isSelected = selectTagsId.includes(item.id);

      return (
        <Button
          key={index}
          flex={1}
          block
          rounded="none"
          bg={isSelected ? "selected" : "body"}
          borderBottomWidth={1}
          borderColor="selected"
          justifyContent="flex-start"
          prefix={
            <Text fontSize="2xl" bg="gray200" p={10} mr="lg" rounded="md">
              {item.emoji}
            </Text>
          }
          suffix={
            <Icon
              name={isSelected ? "tag-plus" : "tag-plus-outline"}
              fontFamily="MaterialCommunityIcons"
              fontSize="2xl"
              color={isSelected ? "twitter" : "gray600"}
              position="absolute"
              right={10}
            />
          }
          onPress={() => handleChange(item.id)}
        >
          <Text fontSize="xl">{`${item.name} (${item.tweets.length})`}</Text>
        </Button>
      );
    },
    [selectTagsId]
  );

  const ListFooterComponent = useCallback(() => {
    const { openModal } = useModalAction();
    return (
      <Button
        bg="selected"
        alignSelf="center"
        rounded="lg"
        mt="lg"
        onPress={() => openModal(EditTagModal, { isVisible: true })}
        prefix={
          <Icon
            name="add"
            fontFamily="MaterialIcons"
            fontSize="xl"
            rounded="md"
            mr="md"
          />
        }
      >
        <Text>タグを作成する</Text>
      </Button>
    );
  }, []);

  const HeaderComponent = () => (
    <Div
      row
      alignItems="center"
      p="lg"
      borderBottomWidth={1}
      borderColor="selected"
    >
      <Text fontSize="3xl" flex={0.4}>
        ブックマーク
      </Text>
      <Text numberOfLines={1} flex={0.6}>
        {selectedTweet.full_text}
      </Text>
    </Div>
  );

  const FooterComponent = () => (
    <Div>
      <Button
        block
        rounded="lg"
        mx="xl"
        my="lg"
        bg="twitter"
        disabled={selectTagsId.length === 0}
        onPress={onSubmit}
      >
        追加する
      </Button>
      <SafeAreaView />
    </Div>
  );

  const keyExtractor = useCallback((_, index) => index.toString(), []);
  const style = useMemo(() => ({ backgroundColor: theme.colors?.body }), [
    theme,
  ]);
  return (
    <Modalize
      ref={modalizeRef}
      flatListProps={{
        data: tagList,
        renderItem,
        ListFooterComponent,
        keyExtractor,
        style,
      }}
      HeaderComponent={HeaderComponent}
      FooterComponent={FooterComponent}
      modalHeight={400}
    />
  );
};

import React, { useState, useEffect, useContext } from "react";
import { Button, Text, Div, Icon, useTheme } from "react-native-magnus";
import { Modalize } from "react-native-modalize";
import { TagContext } from "../contexts/TagContext";
import { Tag } from "../../types/tag";
import { useNavigation } from "@react-navigation/native";

export const BottomSheet = () => {
  const [selectTags, setSelectedTags] = useState<Tag[]>([]);
  const { modalizeRef, closeSelectTag, tags, getTags } = useContext(TagContext);
  const { theme } = useTheme();
  const { navigate } = useNavigation();

  useEffect(() => {
    getTags();
  }, []);

  const handleChange = (tag: Tag) => {
    const selected = selectTags.includes(tag);
    if (selected) {
      setSelectedTags(selectTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectTags, tag]);
    }
  };

  console.log(selectTags);

  const renderItem = ({ item, index }: { item: Tag; index: number }) => {
    const selected = selectTags.includes(item);
    return (
      <Button
        key={index}
        flex={1}
        block
        rounded="none"
        bg={selected ? "selected" : "body"}
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
            name={selected ? "bookmark-check-outline" : "bookmark-outline"}
            fontFamily="MaterialCommunityIcons"
            fontSize="4xl"
            color={selected ? "twitter" : "gray600"}
            position="absolute"
            right={10}
          />
        }
        onPress={() => handleChange(item)}
      >
        <Text fontSize="xl">{`${item.name} (${item.tweets.length})`}</Text>
      </Button>
    );
  };

  const ListFooterComponent = () => (
    <Button
      bg="selected"
      alignSelf="center"
      rounded="lg"
      mt="lg"
      onPress={() => navigate("EditTagModal")}
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

  const HeaderComponent = () => (
    <Div p="lg" borderBottomWidth={1} borderColor="selected">
      <Text fontSize="3xl">ブックマーク</Text>
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
        disabled={selectTags.length === 0}
        onPress={closeSelectTag}
      >
        追加する
      </Button>
    </Div>
  );

  return (
    <Modalize
      ref={modalizeRef}
      flatListProps={{
        data: tags,
        renderItem,
        ListFooterComponent,
        style: {
          backgroundColor: theme.colors?.body,
        },
      }}
      HeaderComponent={HeaderComponent}
      FooterComponent={FooterComponent}
      modalHeight={400}
      // adjustToContentHeight
      onClose={() => setSelectedTags([])}
    />
  );
};

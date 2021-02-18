import React, { FC } from "react";
import { Div, Text, Button, Icon } from "react-native-magnus";
import { Tag } from "../../types/tag";

type TagButtonProps = {
  tag: Tag;
  onPress?: () => void;
  onLongPress?: any;
};

export const TagButton: FC<TagButtonProps> = ({
  tag,
  onPress,
  onLongPress,
}) => {
  return (
    <Button
      flex={1}
      maxH={80}
      block
      rounded="none"
      borderBottomWidth={1}
      borderColor="selected"
      justifyContent="flex-start"
      prefix={
        <Text fontSize="6xl" bg="selected" p={10} mr="lg" rounded="md">
          {tag.emoji}
        </Text>
      }
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Div bg="transparent">
        <Text fontSize="3xl">{tag.name}</Text>
        <Text fontSize="xl" mt="sm">
          {`ブックマークした数: ${tag.tweets.length}`}
        </Text>
      </Div>
    </Button>
  );
};

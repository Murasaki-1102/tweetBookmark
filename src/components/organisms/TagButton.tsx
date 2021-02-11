import React, { FC, useContext } from "react";
import { Div, Text, Button, Icon } from "react-native-magnus";
import { Tag } from "../../types/tag";

type TagButtonProps = {
  tag: Tag;
  onPress?: () => void;
};

export const TagButton: FC<TagButtonProps> = ({ tag, onPress }) => {
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
    >
      <Div>
        <Text fontSize="3xl">{tag.name}</Text>
        <Text fontSize="xl" mt="sm">
          {`tweet数: ${tag.tweets.length}`}
        </Text>
      </Div>
    </Button>
  );
};

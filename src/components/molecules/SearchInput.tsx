import React, { FC } from "react";
import { Icon, Input, Button } from "react-native-magnus";

type SearchInputProps = {
  value?: string;
  onChangeText: (text: string) => void;
};
export const SearchInput: FC<SearchInputProps> = ({ value, onChangeText }) => (
  <Input
    m="sm"
    bg="selected"
    color="text"
    placeholder="キーワード検索"
    autoCapitalize="none"
    prefix={<Icon name="search" fontFamily="MaterialIcons" fontSize="2xl" />}
    suffix={
      value?.length ? (
        <Button
          bg="gray700"
          rounded="circle"
          p={2}
          onPress={() => {
            onChangeText("");
          }}
        >
          <Icon
            name="close"
            fontFamily="MaterialCommunityIcons"
            fontSize="lg"
          />
        </Button>
      ) : null
    }
    value={value}
    onChangeText={onChangeText}
  />
);

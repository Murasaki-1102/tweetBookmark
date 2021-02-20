import React, { FC } from "react";
import { Icon, Input } from "react-native-magnus";

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
    value={value}
    onChangeText={onChangeText}
  />
);

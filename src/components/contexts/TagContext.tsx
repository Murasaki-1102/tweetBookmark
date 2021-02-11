import React, { FC, useRef, createContext, RefObject } from "react";
import { Modalize } from "react-native-modalize";
import { Tag } from "../../types/tag";

type TagContextValue = {
  tags: Tag[];
  modalizeRef: RefObject<Modalize>;
  openSelectTag: () => void;
  closeSelectTag: () => void;
};

export const TagContext = createContext<TagContextValue>({} as TagContextValue);

export const TagProvider: FC = ({ children }) => {
  //fetch
  const tags: Tag[] = [
    { name: "おもしろ", emoji: "😂", tweets: [] },
    { name: "かわいい", emoji: "😎", tweets: [] },
    { name: "ためになる", emoji: "😈", tweets: [] },
    { name: "おもしろ", emoji: "😂", tweets: [] },
    { name: "かわいい", emoji: "😎", tweets: [] },
    { name: "ためになる", emoji: "😈", tweets: [] },
  ];

  const modalizeRef = useRef<Modalize>(null);

  const openSelectTag = () => {
    modalizeRef.current?.open();
  };
  const closeSelectTag = () => {
    modalizeRef.current?.close();
  };

  return (
    <TagContext.Provider
      value={{
        tags,
        modalizeRef,
        openSelectTag,
        closeSelectTag,
      }}
    >
      {children}
    </TagContext.Provider>
  );
};

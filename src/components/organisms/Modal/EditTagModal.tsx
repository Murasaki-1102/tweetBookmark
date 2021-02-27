import React, { FC, useState, useEffect } from "react";
import { SafeAreaView, KeyboardAvoidingView } from "react-native";
import Modal from "react-native-modal";
import { Div, Text, Button, Icon, Input, useTheme } from "react-native-magnus";
import EmojiBoard from "react-native-emoji-board";
import { useTagListAction } from "../../../hooks/useTagList/useTagList";
import { useModalAction } from "../../../hooks/useModal/useModalState";

type EditTagModalProps = {
  id?: string;
  isVisible: boolean;
};

export const EditTagModal: FC<EditTagModalProps> = ({ id, isVisible }) => {
  const [emoji, setEmoji] = useState("💭");
  const [name, setName] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const { getTagById, addTag, updateTagById } = useTagListAction();

  useEffect(() => {
    (async () => {
      if (id) {
        const currentTag = await getTagById(id);
        setName(currentTag.name);
        setEmoji(currentTag.emoji);
      }
    })();
  }, [id]);

  console.log("🚀 ~ file: EditTagModal.tsx ~ line 21 ~ id");

  const { theme } = useTheme();
  const { closeModal } = useModalAction();

  const onClose = () => {
    closeModal();
  };

  const onSubmit = async () => {
    if (id) {
      updateTagById(id, name, emoji);
    } else {
      addTag(name, emoji);
    }
    setEmoji("💭");
    setName("");

    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      animationIn="fadeIn"
      style={{ margin: 0 }}
      onSwipeComplete={closeModal}
      swipeDirection="down"
    >
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors?.body }}>
          <Div flex={1} alignItems="center" py={120} justifyContent="center">
            <Button
              bg="gray400"
              h={40}
              w={40}
              position="absolute"
              top={10}
              right={15}
              rounded="circle"
              onPress={onClose}
            >
              <Icon color="gray800" name="close" />
            </Button>
            <Text
              fontSize={64}
              textAlign="center"
              rounded="md"
              borderWidth={1}
              borderColor="gray300"
              bg="gray200"
              w={80}
              h={80}
              onPress={() => {
                setIsShowKeyboard(true);
              }}
            >
              {emoji}
            </Text>

            <EmojiBoard
              showBoard={isShowKeyboard}
              categoryIconSize={28}
              hideBackSpace={true}
              onClick={(emoji: any) => {
                setEmoji(emoji.code);
                setIsShowKeyboard(false);
              }}
              containerStyle={{
                backgroundColor: theme.colors?.body,
                borderTopWidth: 1,
                borderColor: theme.colors?.selected,
              }}
              categoryHighlightColor={theme.colors?.text}
            />

            <Input
              mt={60}
              onFocus={() => setIsShowKeyboard(false)}
              placeholder="タグ名を入力してください"
              placeholderTextColor="text"
              textAlign="center"
              borderBottomWidth={1}
              bg="body"
              color="text"
              w="70%"
              fontSize="2xl"
              autoCapitalize="none"
              value={name}
              onChangeText={setName}
            />

            <Button
              mt="xl"
              bg="twitter"
              alignSelf="center"
              rounded="circle"
              disabled={name.length === 0}
              onPress={onSubmit}
            >
              <Text color="white">{id ? "編集する" : "作成する"}</Text>
            </Button>
          </Div>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

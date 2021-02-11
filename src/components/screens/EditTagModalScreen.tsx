import React, { FC, useState, useEffect } from "react";
import { SafeAreaView, KeyboardAvoidingView } from "react-native";
import {
  Div,
  Text,
  Button,
  Icon,
  Modal,
  Input,
  useTheme,
} from "react-native-magnus";
import EmojiBoard from "react-native-emoji-board";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";

type EditTagModalScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "EditTagModal">;
};

export const EditTagModalScreen: FC<EditTagModalScreenProps> = ({
  navigation,
}) => {
  const [emoji, setEmoji] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [value, setValue] = useState("");
  const { theme } = useTheme();
  useEffect(() => {}, []);

  const onClose = () => {
    navigation.goBack();
  };

  const onSubmit = () => {
    onClose();
  };

  return (
    // <Modal isVisible={visible} animationIn="fadeInLeft">
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
            w="70%"
            autoCapitalize="none"
            value={value}
            onChangeText={setValue}
          />

          <Button
            mt="xl"
            bg="twitter"
            alignSelf="center"
            rounded="circle"
            onPress={onSubmit}
          >
            作成する
          </Button>
        </Div>
      </SafeAreaView>
    </KeyboardAvoidingView>
    // </Modal>
  );
};

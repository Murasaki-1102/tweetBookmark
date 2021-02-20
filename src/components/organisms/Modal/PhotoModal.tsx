import React, { FC } from "react";
import { SafeAreaView } from "react-native";
import {
  Div,
  Button,
  Icon,
  useTheme,
  Text,
  StatusBar,
} from "react-native-magnus";
import ImageView from "react-native-image-viewing";
import { useModalAction } from "../../../hooks/useModal/useModalState";
import { MediaType } from "../../../types/tweet";

type PhotoModalProps = {
  photos: MediaType[];
  index: number;
  isVisible: boolean;
};

export const PhotoModal: FC<PhotoModalProps> = ({
  photos,
  index,
  isVisible,
}) => {
  console.log("🚀 ~ file: PhotoModalScreen.tsx ~ line 21 ~ id");
  const { closeModal } = useModalAction();
  const { theme } = useTheme();
  const images = photos.map((photo) => ({ uri: photo.media_url_https }));

  const HeaderComponent = () => (
    <>
      <SafeAreaView />
      <Div bg="gray900">
        <Button
          alignSelf="flex-end"
          rounded="circle"
          bg="gray800"
          m="lg"
          onPress={closeModal}
        >
          <Icon
            name="close"
            fontFamily="MaterialCommunityIcons"
            fontSize="xl"
          />
        </Button>
      </Div>
    </>
  );

  const FooterComponent = ({ imageIndex }: { imageIndex: number }) => (
    <>
      <StatusBar barStyle="light-content" />
      <Div h={80} bg="gray900" justifyContent="center" alignItems="center">
        <Text color="white">{`${imageIndex + 1} / ${images.length}`}</Text>
      </Div>
      <SafeAreaView />
    </>
  );
  return (
    <ImageView
      images={images}
      imageIndex={index}
      visible={isVisible}
      onRequestClose={closeModal}
      swipeToCloseEnabled
      backgroundColor={theme.colors?.gray900}
      HeaderComponent={HeaderComponent}
      FooterComponent={FooterComponent}
    />
  );
};

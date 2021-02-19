import React, { FC } from "react";
import { SafeAreaView, View } from "react-native";
import { Button, Icon, Image, useTheme } from "react-native-magnus";
import Modal from "react-native-modal";
import ViewPager from "@react-native-community/viewpager";
import { useModalAction } from "../../../hooks/useModal/useModalState";
import { MediaType } from "../../../types/tweet";

type PhotoModalProps = {
  photos: MediaType[];
  index: number;
};

export const PhotoModal: FC<PhotoModalProps> = ({ photos, index }) => {
  console.log("🚀 ~ file: PhotoModalScreen.tsx ~ line 21 ~ id");
  const { closeModal } = useModalAction();
  const { theme } = useTheme();

  return (
    <Modal
      isVisible
      animationIn="zoomIn"
      onSwipeComplete={closeModal}
      swipeDirection="down"
      onBackdropPress={closeModal}
      useNativeDriver={true}
      style={{ margin: 0 }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: theme.colors?.gray900,
        }}
      >
        <Button
          bg="gray400"
          h={40}
          w={40}
          position="absolute"
          top={60}
          right={20}
          rounded="circle"
          onPress={closeModal}
          zIndex={9999}
        >
          <Icon color="gray800" name="close" />
        </Button>
        <ViewPager
          initialPage={index}
          style={{ flex: 1 }}
          pageMargin={12}
          showPageIndicator
        >
          {photos.map((photo, index) => (
            <View
              key={index}
              style={{ backgroundColor: theme.colors?.gray900 }}
            >
              <Image
                source={{ uri: photo.media_url_https }}
                h="100%"
                w="100%"
                resizeMode="contain"
              />
            </View>
          ))}
        </ViewPager>
      </SafeAreaView>
    </Modal>
  );
};

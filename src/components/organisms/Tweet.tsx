import React, { useContext } from "react";
import { TouchableHighlight } from "react-native";
import { Div, Text, Button, Image, Icon } from "react-native-magnus";
import { TagContext } from "../contexts/TagContext";

export const Tweet = () => {
  const { openSelectTag } = useContext(TagContext);
  return (
    <TouchableHighlight style={{ flex: 1 }}>
      <Div flex={1} w="100%" row borderBottomWidth={1} borderColor="selected">
        <Div flex={0.23} alignItems="center">
          <Image
            h={50}
            w={50}
            rounded="circle"
            mt="lg"
            source={{
              uri:
                "https://images.unsplash.com/photo-1593642532400-2682810df593?ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            }}
          />
        </Div>
        <Div flex={0.77}>
          <Div py="md">
            <Div row alignItems="center" justifyContent="space-between">
              <Div row>
                <Text fontSize="xl" fontWeight="bold">
                  murasaki
                </Text>
                <Text ml="md" color="gray600">
                  @murasaki
                </Text>
              </Div>
              <Button py="none" onPress={openSelectTag}>
                <Icon
                  name="bookmark-border"
                  fontFamily="MaterialIcons"
                  fontSize="2xl"
                />
              </Button>
            </Div>

            <Div mt="sm" pr="xl">
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Eveniet, odio? Rerum sequi ad quos, id aspernatur harum ipsa,
                eius doloribus velit voluptatem nostrum, sint dolorem. Fugit
                natus ratione excepturi quis! Lorem ipsum dolor, sit amet
                consectetur adipisicing elit. Numquam veritatis quis expedita
                perspiciatis alias tenetur quisquam deserunt cupiditate error
                earum. Amet quibusdam consequatur eligendi! Obcaecati, ducimus
                ad! Facilis, tempore cupiditate.
              </Text>
            </Div>

            <Div row mt="md">
              {/* <Div row alignItems="center">
                <Icon
                  name="chatbubble-outline"
                  fontFamily="Ionicons"
                  fontSize="3xl"
                  color="gray800"
                />
                <Text>12</Text>
              </Div>
              <Div row alignItems="center" ml="2xl">
                <Icon
                  name="twitter-retweet"
                  fontFamily="MaterialCommunityIcons"
                  fontSize="3xl"
                  color="gray800"
                />
                <Text>233</Text>
              </Div> */}
              {/* <Div row alignItems="center" ml="2xl">
                <Icon
                  name="favorite-outline"
                  fontFamily="MaterialIcons"
                  fontSize="3xl"
                  color="gray800"
                />
                <Text>3333</Text>
              </Div> */}
            </Div>
          </Div>
        </Div>
      </Div>
    </TouchableHighlight>
  );
};

import { useReducer, useRef } from "react";
import { Modalize } from "react-native-modalize";
import { TweetType } from "../../types/tweet";

type BottomSheetState = {
  selectedTweet: TweetType;
};
type BottomSheetAction = {
  type: "OPEN" | "CLOSE";
  payload: BottomSheetState;
};

const reducer: React.Reducer<BottomSheetState, BottomSheetAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "OPEN":
      return {
        selectedTweet: action.payload.selectedTweet,
      };
    case "CLOSE":
      return {
        ...state,
      };
    default:
      throw new Error();
  }
};

export const useBottomSheetCore = () => {
  const [state, dispatch] = useReducer(reducer, {
    selectedTweet: {} as TweetType,
  });
  const modalizeRef = useRef<Modalize>(null);

  return {
    state,
    dispatch,
    modalizeRef,
  } as const;
};

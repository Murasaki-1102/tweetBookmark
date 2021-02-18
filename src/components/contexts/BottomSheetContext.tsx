import React, {
  createContext,
  FC,
  useCallback,
  useMemo,
  RefObject,
  useContext,
} from "react";
import { Modalize } from "react-native-modalize";
import { useBottomSheetCore } from "../../hooks/useBottomSheet/useBottomSheetCore";
import { TweetType } from "../../types/tweet";
import { TagListStateContext } from "./TagListContext";

type BottomSheetStateContextValue = {
  selectedTweet: TweetType;
  modalizeRef: RefObject<Modalize>;
};

type BottomSheetActionContextValue = {
  openBottomSheet: (tweet: TweetType) => void;
};

export const BottomSheetStateContext = createContext(
  {} as BottomSheetStateContextValue
);

export const BottomSheetActionContext = createContext(
  {} as BottomSheetActionContextValue
);

export const BottomSheetProvider: FC = ({ children }) => {
  const { state, dispatch, modalizeRef } = useBottomSheetCore();
  const { tagList } = useContext(TagListStateContext);

  const openBottomSheet = useCallback((tweet: TweetType) => {
    dispatch({ type: "OPEN", payload: { selectedTweet: tweet } });
    modalizeRef.current?.open();
  }, []);

  const actions = useMemo(() => ({ openBottomSheet }), [openBottomSheet]);

  return (
    <BottomSheetStateContext.Provider
      value={{ selectedTweet: state.selectedTweet, modalizeRef }}
    >
      <BottomSheetActionContext.Provider value={actions}>
        {children}
      </BottomSheetActionContext.Provider>
    </BottomSheetStateContext.Provider>
  );
};

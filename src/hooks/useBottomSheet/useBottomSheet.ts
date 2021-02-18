import { useContext } from "react";
import {
  BottomSheetStateContext,
  BottomSheetActionContext,
} from "../../components/contexts/BottomSheetContext";

export const useBottomSheetState = () => {
  return useContext(BottomSheetStateContext);
};

export const useBottomSheetAction = () => {
  return useContext(BottomSheetActionContext);
};

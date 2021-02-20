import { useContext } from "react";
import {
  BottomSheetStateContext,
  BottomSheetActionContext,
} from "../../components/contexts/BottomSheetContext";

export const useBottomSheetState = () => useContext(BottomSheetStateContext);

export const useBottomSheetAction = () => useContext(BottomSheetActionContext);

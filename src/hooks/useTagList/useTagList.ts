import { useContext } from "react";
import {
  TagListStateContext,
  TagListActionContext,
} from "../../components/contexts/TagListContext";

export const useTagListState = () => {
  return useContext(TagListStateContext);
};

export const useTagListAction = () => {
  return useContext(TagListActionContext);
};

import { useContext } from "react";
import {
  TagListStateContext,
  TagListActionContext,
} from "../../components/contexts/TagListContext";

export const useTagListState = () => useContext(TagListStateContext);

export const useTagListAction = () => useContext(TagListActionContext);

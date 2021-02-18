import { useContext } from "react";
import {
  ModalActionContext,
  ModalStateContext,
} from "../../components/contexts/ModalContext";

export const useModalState = () => {
  return useContext(ModalStateContext);
};

export const useModalAction = () => {
  return useContext(ModalActionContext);
};

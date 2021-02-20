import { useContext } from "react";
import {
  ModalActionContext,
  ModalStateContext,
} from "../../components/contexts/ModalContext";

export const useModalState = () => useContext(ModalStateContext);

export const useModalAction = () => useContext(ModalActionContext);

import React from "react";
import { useModalState } from "../../hooks/useModal/useModalState";

export const ModalManager = () => {
  const { modalComponent, modalProps } = useModalState();
  console.log("modalmanager");
  if (!modalComponent) return null;

  const Modal = modalComponent;
  return <Modal {...modalProps} />;
};

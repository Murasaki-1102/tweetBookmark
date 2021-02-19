import React, {
  createContext,
  FC,
  useState,
  useCallback,
  useMemo,
} from "react";

type ModalStateContextValue = {
  modalComponent: FC<any> | null;
  modalProps?: any;
};
export const ModalStateContext = createContext({} as ModalStateContextValue);

type ModalActionContextValue = {
  openModal: <T>(modalComponent: FC<T>, modalProps?: T) => void;
  closeModal: () => void;
};
export const ModalActionContext = createContext({} as ModalActionContextValue);

export const ModalProvider: FC = ({ children }) => {
  const [modalState, setModalState] = useState<ModalStateContextValue>({
    modalComponent: null,
    modalProps: {},
  });

  const openModal = useCallback((modalComponent: FC<any>, modalProps?: any) => {
    setModalState({ modalComponent, modalProps });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({ modalComponent: null, modalProps: {} });
  }, []);

  const actions = useMemo(
    () => ({
      openModal,
      closeModal,
    }),
    [openModal, closeModal]
  );

  return (
    <ModalStateContext.Provider value={modalState}>
      <ModalActionContext.Provider value={actions}>
        {children}
      </ModalActionContext.Provider>
    </ModalStateContext.Provider>
  );
};

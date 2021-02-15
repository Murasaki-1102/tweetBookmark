import React, {
  FC,
  useState,
  useRef,
  createContext,
  RefObject,
  Dispatch,
  SetStateAction,
} from "react";
import { Modalize } from "react-native-modalize";
import { Tag } from "../../types/tag";
import firebase from "../../lib/firebase";

type TagContextValue = {
  tags: Tag[];
  setTags: Dispatch<SetStateAction<Tag[]>>;
  getTags: () => void;
  modalizeRef: RefObject<Modalize>;
  openSelectTag: () => void;
  closeSelectTag: () => void;
};

export const TagContext = createContext<TagContextValue>({} as TagContextValue);

export const TagProvider: FC = ({ children }) => {
  const [tags, setTags] = useState<Tag[]>([]);

  const getTags = async () => {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      firebase
        .firestore()
        .collection(`users/${currentUser?.uid}/tags`)
        .orderBy("index", "asc")
        .onSnapshot(async (snapshot) => {
          const userTags: Tag[] = [];
          await snapshot.forEach((doc) => {
            const data = doc.data();
            userTags.push({
              id: doc.id,
              index: data.index,
              name: data.name,
              emoji: data.emoji,
              tweets: [],
              createdAt: data.createdAt.toDate(),
            });
          });
          setTags(userTags);
        });
    }
  };

  const modalizeRef = useRef<Modalize>(null);

  const openSelectTag = () => {
    modalizeRef.current?.open();
  };
  const closeSelectTag = () => {
    modalizeRef.current?.close();
  };

  return (
    <TagContext.Provider
      value={{
        tags,
        setTags,
        getTags,
        modalizeRef,
        openSelectTag,
        closeSelectTag,
      }}
    >
      {children}
    </TagContext.Provider>
  );
};

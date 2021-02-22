import React, {
  createContext,
  FC,
  useState,
  useCallback,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";
import { Tag } from "../../types/tag";
import firebase from "../../lib/firebase";
import { useAuthState } from "../../hooks/useAuth/useAuth";

type TagListStateContextValue = {
  tagList: Tag[];
};
type TagListActionContextValue = {
  setTagList: Dispatch<SetStateAction<Tag[]>>;
  getTagList: () => void;
  getTagById: (id: string) => Promise<Tag>;
  addTag: (name: string, emoji: string) => void;
  updateTagById: (id: string, name: string, emoji: string) => void;
  deleteTagById: (id: string, callback?: () => Promise<void>) => void;
};

export const TagListStateContext = createContext(
  {} as TagListStateContextValue
);
export const TagListActionContext = createContext(
  {} as TagListActionContextValue
);

export const TagListProvider: FC = ({ children }) => {
  const [tagList, setTagList] = useState<Tag[]>([]);
  const { user } = useAuthState();

  const collection = useMemo(
    () => firebase.firestore().collection(`users/${user?.uid}/tags`),
    [user]
  );

  const getTagList = useCallback(() => {
    console.log("get");
    collection.orderBy("index", "asc").onSnapshot((snapshot) => {
      const userTagList: Tag[] = [];
      snapshot.forEach((doc) =>
        userTagList.push({
          ...(doc.data() as Tag),
          id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
        })
      );
      setTagList(userTagList);
    });
  }, [collection]);

  const getTagById = useCallback(
    async (id: string) =>
      await collection
        .doc(id)
        .get()
        .then((doc) => {
          return doc.data() as Tag;
        }),
    [collection]
  );

  const addTag = useCallback(
    async (name: string, emoji: string) => {
      const documentLength = await collection
        .get()
        .then((doc) => doc.size)
        .catch((error) => console.log(error));

      collection
        .add({
          name,
          emoji,
          index: documentLength,
          tweets: [],
          createdAt: new Date(),
        })
        .catch((error) => console.log(error));
    },
    [collection]
  );

  const updateTagById = useCallback(
    (id: string, name: string, emoji: string) => {
      collection.doc(id).update({ name, emoji });
    },
    [collection]
  );

  const deleteTagById = useCallback(
    (id: string, callback?: () => Promise<void>) => {
      console.log("delete");
      collection
        .doc(id)
        .delete()
        .then(callback)
        .catch((error) => console.log(error));
    },
    [collection]
  );

  // const getTweet = async (id: string) => {
  //   if (!id) return;
  //   const { currentUser } = firebase.auth();
  //   if (currentUser) {
  //     const tweetDocRef = await firebase
  //       .firestore()
  //       .collection(`users/${currentUser?.uid}/tweets`)
  //       .doc(id);
  //     const tweetDoc = await tweetDocRef.get();
  //     return tweetDoc.data();
  //   }
  // };

  const actions = useMemo(
    () => ({
      setTagList,
      getTagList,
      getTagById,
      addTag,
      updateTagById,
      deleteTagById,
    }),
    [setTagList, getTagList, getTagById, addTag, updateTagById, deleteTagById]
  );

  return (
    <TagListStateContext.Provider value={{ tagList }}>
      <TagListActionContext.Provider value={actions}>
        {children}
      </TagListActionContext.Provider>
    </TagListStateContext.Provider>
  );
};

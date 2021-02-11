import { Tag } from "./tag";

export type RootStackParamList = {
  Home: undefined;
  Bookmark: undefined;
  Tag: { tag: Tag };
  EditTagModal: undefined;
  Drawer: undefined;
  EditTheme: undefined;
};

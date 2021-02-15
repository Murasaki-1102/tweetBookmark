import { Tag } from "./tag";

export type RootStackParamList = {
  Home: undefined;
  Bookmark: undefined;
  Tag: { id: string };
  EditTagModal: undefined;
  Drawer: undefined;
  EditTheme: undefined;
};

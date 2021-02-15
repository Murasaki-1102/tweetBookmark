import { Tag } from "./tag";

export type RootStackParamList = {
  Home: undefined;
  TagList: undefined;
  Tag: { id: string };
  EditTagModal: { id?: string };
  Drawer: undefined;
  EditTheme: undefined;
};

import { Tag } from "./tag";

export type RootStackParamList = {
  Home: undefined;
  TagList: undefined;
  TagDetail: { tag: Tag };
  Drawer: undefined;
  EditTheme: undefined;
};

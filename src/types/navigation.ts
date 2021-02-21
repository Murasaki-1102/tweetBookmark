import { Tag } from "./tag";

export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  TagList: undefined;
  TagDetail: { tag: Tag };
  Drawer: undefined;
  EditTheme: undefined;
  Help: undefined;
};

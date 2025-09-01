import { songType } from "../Types/types";

export type AuthInputProps = {
  children: React.ReactNode;
  placeholder: string;
  value: string;
  onChangeText: (val: string) => void;
  showPassword?: boolean;
};

export type btnProps = {
  text: string;
  onPress: () => void;
};

export type recommendedSongContainerProps = {
  item: songType;
  id: number | undefined;
  queue?: songType[];
};

export type sheetContent = {
  text: string;
  onPress: () => void;
  children: React.ReactNode;
  showArrow?: boolean;
};

export type PlayerSliderProps = {
  showDuration?: boolean;
};

export type mySongContainerProps = {
  children: React.ReactNode;
  text: string;
  onPress: () => void;
};
export type SettingOptionProps = {
  children: React.ReactNode;
  title: string;
  onPress: () => void;
};

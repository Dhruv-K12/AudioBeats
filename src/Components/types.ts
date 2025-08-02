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
};

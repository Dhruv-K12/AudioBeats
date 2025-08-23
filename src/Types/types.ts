import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { User } from "firebase/auth";
import { rootMainStackParmList } from "../Navigation/type";

export type booleanState = React.Dispatch<
  React.SetStateAction<boolean>
>;
export type userState = React.Dispatch<
  React.SetStateAction<User | undefined>
>;
export type stringState = React.Dispatch<
  React.SetStateAction<string>
>;

export type songsState = React.Dispatch<
  React.SetStateAction<songType[]>
>;
export type songState = React.Dispatch<
  React.SetStateAction<songType | null>
>;
export type numberState = React.Dispatch<
  React.SetStateAction<number[]>
>;
export type songType = {
  artist: string;
  img: string;
  name: string;
  src: string;
  id: number;
};

export type navigationType =
  NativeStackNavigationProp<rootMainStackParmList>;

export type playlistType = {
  name: string;
  id: string;
  songs: songType[] | null;
  color: string;
};

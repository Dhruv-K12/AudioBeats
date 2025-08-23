import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { songType } from "../Types/types";

export type routeAuthStackParamList = {
  Intro: undefined;
  Login: undefined;
  SignUp: undefined;
};
export type navigationType =
  NativeStackNavigationProp<routeAuthStackParamList>;

export type rootMainStackParmList = {
  Main: undefined;
  MusicDetail: {
    item: songType | undefined | null;
  };
  MySongDetail: {
    name: string;
    item: songType[];
  };
  PlaylistSongs: {
    item: songType[] | null;
  };
};

import { AudioPlayer, AudioStatus } from "expo-audio";
import {
  booleanState,
  songsState,
  songState,
  songType,
  stringState,
} from "../Types/types";
import { SharedValue } from "react-native-reanimated";

export type mainCtxType = {
  player: AudioPlayer;
  playerStatus: AudioStatus;
  songs: songType[];
  setSongs: songsState;
  currSong: songType | null;
  setCurrSong: songState;
  prevSong: songType | null;
  setPrevSong: songState;
  sheetHeight: SharedValue<number>;
};

import { AudioPlayer } from "expo-audio";
import {
  booleanState,
  numberState,
  playlistType,
  songsState,
  songState,
  songType,
  stringState,
} from "../Types/types";
import { SharedValue } from "react-native-reanimated";

export type mainCtxType = {
  player: AudioPlayer;
  songs: songType[];
  setSongs: songsState;
  currSong: songType | null;
  setCurrSong: songState;
  prevSong: number[];
  setPrevSong: numberState;
  selectedSong: songType | null;
  setSelectedSong: songState;
  translateY: SharedValue<number>;
  downloadedSong: songType[];
  setDownloadedSong: songsState;
  favourite: songType[];
  setFavourite: songsState;
  playing: boolean;
  isPlaying: booleanState;
  recentSongs: songType[];
  setRecentSongs: songsState;
  queue: songType[];
  setQueue: songsState;
  tabBarHeight: number;
  setTabBarHeight: React.Dispatch<
    React.SetStateAction<number>
  >;
  playlist: playlistType[];
  setPlaylist: React.Dispatch<
    React.SetStateAction<playlistType[]>
  >;
  dialogAction: string;
  setDialogAction: stringState;
  selectedPlaylist: playlistType | null;
  setSelectedPlaylist: React.Dispatch<
    React.SetStateAction<playlistType | null>
  >;
  loop: boolean;
  setLoop: booleanState;
};

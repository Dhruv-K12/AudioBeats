import { createContext, useContext, useState } from "react";
import { authCtxProp } from "./authContext.type";
import { useAudioPlayer } from "expo-audio";
import { mainCtxType } from "./mainContext.type";
import { playlistType, songType } from "../Types/types";
import { useSharedValue } from "react-native-reanimated";
import { useWindowDimensions } from "react-native";

const MainCtx = createContext<null | mainCtxType>(null);

export const MainCtxProvider = ({
  children,
}: authCtxProp) => {
  const player = useAudioPlayer("");
  const [tabBarHeight, setTabBarHeight] = useState(0);
  const [songs, setSongs] = useState<songType[]>([]);
  const [currSong, setCurrSong] = useState<songType | null>(
    null
  );
  const [prevSong, setPrevSong] = useState<number[]>([]);
  const [selectedSong, setSelectedSong] =
    useState<songType | null>(null);
  const [downloadedSong, setDownloadedSong] = useState<
    songType[]
  >([]);
  const [favourite, setFavourite] = useState<songType[]>(
    []
  );
  const [recentSongs, setRecentSongs] = useState<
    songType[]
  >([]);
  const [playing, isPlaying] = useState(false);
  const height = useWindowDimensions().height;
  const translateY = useSharedValue(height / 2);
  const [queue, setQueue] = useState<songType[]>([]);
  const [playlist, setPlaylist] = useState<playlistType[]>(
    []
  );
  const [dialogAction, setDialogAction] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] =
    useState<playlistType | null>(null);
  const [loop, setLoop] = useState(false);
  const value = {
    player,
    songs,
    setSongs,
    currSong,
    setCurrSong,
    prevSong,
    setPrevSong,
    selectedSong,
    setSelectedSong,
    translateY,
    downloadedSong,
    setDownloadedSong,
    favourite,
    setFavourite,
    playing,
    isPlaying,
    recentSongs,
    setRecentSongs,
    queue,
    setQueue,
    tabBarHeight,
    setTabBarHeight,
    playlist,
    setPlaylist,
    dialogAction,
    setDialogAction,
    selectedPlaylist,
    setSelectedPlaylist,
    loop,
    setLoop,
  };
  return (
    <MainCtx.Provider value={value}>
      {children}
    </MainCtx.Provider>
  );
};

export const useMainCtx = () => {
  const ctx = useContext(MainCtx);
  if (!ctx) {
    throw new Error("Main Provider is Not wraaped up");
  }
  return ctx;
};

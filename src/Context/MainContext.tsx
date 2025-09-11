import { createContext, useContext, useState } from "react";
import { authCtxProp } from "./authContext.type";
import { useAudioPlayer } from "expo-audio";
import { mainCtxType } from "./mainContext.type";
import { playlistType, songType } from "../Types/types";
import { useSharedValue } from "react-native-reanimated";
import { useWindowDimensions } from "react-native";

const MainCtx = createContext<null | mainCtxType>(null);

export const MainCtxProvider = ({ children }: authCtxProp) => {
  const player = useAudioPlayer("");
  const [tabBarHeight, setTabBarHeight] = useState(0);
  const [currSong, setCurrSong] = useState<songType | null>(null);
  const [prevSong, setPrevSong] = useState<number[]>([]);
  const [selectedSong, setSelectedSong] = useState<songType | null>(null);
  const [downloadedSong, setDownloadedSong] = useState<songType[]>([]);
  const [playing, isPlaying] = useState(false);
  const height = useWindowDimensions().height;
  const translateY = useSharedValue(height / 2);
  const [queue, setQueue] = useState<songType[]>([]);
  const [dialogAction, setDialogAction] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState<playlistType | null>(
    null
  );
  const [loop, setLoop] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const value = {
    player,
    currSong,
    setCurrSong,
    prevSong,
    setPrevSong,
    selectedSong,
    setSelectedSong,
    translateY,
    downloadedSong,
    setDownloadedSong,
    playing,
    isPlaying,
    queue,
    setQueue,
    tabBarHeight,
    setTabBarHeight,
    dialogAction,
    setDialogAction,
    selectedPlaylist,
    setSelectedPlaylist,
    loop,
    setLoop,
    searchVal,
    setSearchVal,
  };
  return <MainCtx.Provider value={value}>{children}</MainCtx.Provider>;
};

export const useMainCtx = () => {
  const ctx = useContext(MainCtx);
  if (!ctx) {
    throw new Error("Main Provider is Not wraaped up");
  }
  return ctx;
};

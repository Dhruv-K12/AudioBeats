import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { authCtxProp } from "./authContext.type";
import {
  AudioStatus,
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";
import { mainCtxType } from "./mainContext.type";
import { songType } from "../Types/types";
import { useSharedValue } from "react-native-reanimated";
import LottieView from "lottie-react-native";

const MainCtx = createContext<null | mainCtxType>(null);

export const MainCtxProvider = ({
  children,
}: authCtxProp) => {
  const player = useAudioPlayer("", 1000);
  const playerStatus = useAudioPlayerStatus(player);
  const [songs, setSongs] = useState<songType[]>([]);
  const [currSong, setCurrSong] = useState<songType | null>(
    null
  );
  const [prevSong, setPrevSong] = useState<songType | null>(
    null
  );
  const sheetHeight = useSharedValue(0);

  const value = {
    player,
    playerStatus,
    songs,
    setSongs,
    currSong,
    setCurrSong,
    prevSong,
    setPrevSong,
    sheetHeight,
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

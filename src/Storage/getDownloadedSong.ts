import AsyncStorage from "@react-native-async-storage/async-storage";
import { songsState } from "../Types/types";

export const getDownloadedSong = async (
  setDownloadSong: songsState
) => {
  let data = await AsyncStorage.getItem("Songs");
  if (data) {
    setDownloadSong(JSON.parse(data));
  }
};

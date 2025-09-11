import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSongsStore } from "../Store/songsStore";

export const getRecentSongs = async () => {
  try {
    const data = await AsyncStorage.getItem("RecentSongs");
    if (data) {
      useSongsStore.getState().setRecentSongs(JSON.parse(data));
    }
  } catch (e) {
    console.log(e);
  }
};

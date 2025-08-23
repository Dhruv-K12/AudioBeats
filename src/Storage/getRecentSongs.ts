import AsyncStorage from "@react-native-async-storage/async-storage";
import { songsState } from "../Types/types";

export const getRecentSongs = async (
  setRecentSongs: songsState
) => {
  try {
    const data = await AsyncStorage.getItem("RecentSongs");
    if (data) {
      setRecentSongs(JSON.parse(data));
    }
  } catch (e) {
    console.log(e);
  }
};

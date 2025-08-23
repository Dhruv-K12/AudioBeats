import AsyncStorage from "@react-native-async-storage/async-storage";
import { songType } from "../Types/types";

export const saveRecentSong = async (item: songType[]) => {
  try {
    await AsyncStorage.setItem(
      "RecentSongs",
      JSON.stringify(item)
    );
  } catch (e) {
    console.log(e);
  }
};

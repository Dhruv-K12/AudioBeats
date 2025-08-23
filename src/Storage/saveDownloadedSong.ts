import AsyncStorage from "@react-native-async-storage/async-storage";
import { songType, stringState } from "../Types/types";

export const saveDownloadSong = async (
  song: songType,
  downloadedSong: songType[],
  setError: stringState
) => {
  try {
    const updatedSong = [...downloadedSong, song];
    await AsyncStorage.setItem(
      "Songs",
      JSON.stringify(updatedSong)
    );
    setError(`${song.name} is downloaded`);
    return updatedSong;
  } catch (e) {
    console.log(e);
  }
};

import AsyncStorage from "@react-native-async-storage/async-storage";
import { songType } from "../Types/types";
import * as FileSystem from "expo-file-system";
export const deleteDownloadedSong = async (
  song: songType | null,
  downloadedsongs: songType[]
) => {
  if (!song) return;
  const songUri =
    FileSystem.documentDirectory + `${song.name}.mp3`;
  const imgUri =
    FileSystem.documentDirectory + `${song.name}.jpg`;
  try {
    const songInfo = await FileSystem.getInfoAsync(songUri);
    const imgInfo = await FileSystem.getInfoAsync(imgUri);
    if (songInfo.exists && imgInfo.exists) {
      await FileSystem.deleteAsync(songUri);
      await FileSystem.deleteAsync(imgUri);
      const currDownloadedSongs = downloadedsongs.filter(
        (each) => each.id !== song.id
      );
      await AsyncStorage.setItem(
        "Songs",
        JSON.stringify(currDownloadedSongs)
      );
      return currDownloadedSongs;
    }
  } catch (e) {
    console.log(e);
  }
};

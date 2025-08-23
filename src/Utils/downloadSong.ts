import * as FileSystem from "expo-file-system";
import {
  songsState,
  songType,
  stringState,
} from "../Types/types";
import { saveDownloadSong } from "../Storage/saveDownloadedSong";

export const downloadSong = async (
  song: songType | null,
  setProgress: React.Dispatch<React.SetStateAction<number>>,
  setError: stringState,
  downloadedSong: songType[],
  setDownloadedSong: songsState
) => {
  if (!song) return;
  const { artist, id, img, name, src } = song;
  const songUri =
    FileSystem.documentDirectory + `${name}.mp3`;
  const imgUri =
    FileSystem.documentDirectory + `${name}.jpg`;
  const downloadSongResumable =
    FileSystem.createDownloadResumable(
      src,
      songUri,
      {},
      (progress) => {
        const percent =
          progress.totalBytesWritten /
          progress.totalBytesExpectedToWrite;
        setProgress(Math.floor(percent * 100));
      }
    );
  const downloadImageResumable =
    FileSystem.createDownloadResumable(img, imgUri, {});
  try {
    const resultSong =
      await downloadSongResumable.downloadAsync();
    const resultImage =
      await downloadImageResumable.downloadAsync();
    if (resultImage && resultSong) {
      const song = {
        artist,
        name,
        img: resultImage?.uri,
        src: resultSong?.uri,
        id,
      };
      const downlaoadSongs = await saveDownloadSong(
        song,
        downloadedSong,
        setError
      );
      setDownloadedSong(downlaoadSongs as songType[]);
    }
  } catch (e) {
    console.log(e);
  }
};

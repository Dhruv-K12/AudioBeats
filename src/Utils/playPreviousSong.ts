import { AudioPlayer } from "expo-audio";
import { songState, songType } from "../Types/types";

export const playPreviousSong = (
  player: AudioPlayer,
  setCurrSong: songState,
  previousSong: number[],
  songs: songType[]
) => {
  if (previousSong.length > 0) {
    const previousSongData =
      songs[previousSong[previousSong.length - 1]];
    setCurrSong(previousSongData);
    player.replace(previousSongData.src);
    player.play();
    previousSong.pop();
  }
};

import { AudioPlayer } from "expo-audio";
import { songState, songType } from "../Types/types";
import { playSong } from "./playSong";

export const playPreviousSong = (
  player: AudioPlayer,
  setCurrSong: songState,
  previousSong: songType | null,
  currSong: songType | null
) => {
  if (!previousSong || previousSong == currSong) {
    return;
  }
  setCurrSong(previousSong);
  playSong(player, previousSong.src);
};

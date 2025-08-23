import { AudioPlayer } from "expo-audio";
import {
  numberState,
  songState,
  songType,
} from "../Types/types";

export const changeSongInQueue = (
  player: AudioPlayer,
  songs: songType[],
  setCurrSong: songState,
  currSong: songType | null,
  setPrevSong: numberState
) => {
  const currIndex = songs.findIndex(
    (songs) => songs.id === currSong?.id
  );
  setPrevSong((prevsong) => {
    const updatedPrev = [...prevsong, currIndex].slice(-10);
    return updatedPrev;
  });
  if (songs[currIndex + 1]) {
    setCurrSong(songs[currIndex + 1]);
    player.replace(songs[currIndex + 1].src);
    player.play();
  } else {
    setCurrSong(songs[0]);
    player.replace(songs[0].src);
    player.play();
  }
};

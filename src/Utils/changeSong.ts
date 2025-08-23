import { AudioPlayer } from "expo-audio";
import {
  numberState,
  songState,
  songType,
} from "../Types/types";
import { playSong } from "./playSong";

export const changeSong = (
  player: AudioPlayer,
  songs: songType[],
  setCurrSong: songState,
  currSong: songType | null,
  setPrevSong: numberState
) => {
  const exclude = songs.findIndex(
    (song) => song.id === currSong?.id
  );
  if (exclude !== -1) {
    setPrevSong((prevsong) => {
      const updatedPrev = [...prevsong, exclude].slice(-10);
      return updatedPrev;
    });
  }
  let randomNumber: number;
  if (songs.length === 1) {
    return;
  }
  do {
    randomNumber = Math.floor(Math.random() * songs.length);
  } while (exclude == randomNumber);
  setCurrSong(songs[randomNumber]);
  playSong(player, songs[randomNumber].src);
};

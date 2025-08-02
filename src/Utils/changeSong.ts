import { AudioPlayer } from "expo-audio";
import { songState, songType } from "../Types/types";
import { playSong } from "./playSong";

export const changeSong = (
  player: AudioPlayer,
  songs: songType[],
  setCurrSong: songState,
  currSong: songType | null,
  setPrevSong: songState
) => {
  setPrevSong(currSong);
  const exclude = songs.findIndex(
    (song) => song === currSong
  );
  let randomNumber: number;
  do {
    randomNumber = Math.floor(Math.random() * songs.length);
  } while (exclude == randomNumber);
  setCurrSong(songs[randomNumber]);
  playSong(player, songs[randomNumber].src);
};

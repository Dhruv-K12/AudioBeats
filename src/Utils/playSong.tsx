import { AudioPlayer } from "expo-audio";

export const playSong = (
  player: AudioPlayer,
  src: string
) => {
  player.replace(src);
  player.play();
};

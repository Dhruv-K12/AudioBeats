import { AudioPlayer } from "expo-audio";

export const playAndPause = (player: AudioPlayer) => {
  if (player.playing) {
    player.pause();
    return;
  }
  player.play();
};

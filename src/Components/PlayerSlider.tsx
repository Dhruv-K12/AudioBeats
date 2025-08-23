import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { PlayerSliderProps } from "./types";
import Slider from "@react-native-community/slider";
import { useAudioPlayerStatus } from "expo-audio";
import { useMainCtx } from "../Context/MainContext";
import { saveRecentSong } from "../Storage/saveRecentSongs";
import { changeSong } from "../Utils/changeSong";
import { changeSongInQueue } from "../Utils/changeSongInQueue";
import { colors } from "../Constants/colors";

const PlayerSlider = ({
  showDuration,
}: PlayerSliderProps) => {
  const {
    player,
    isPlaying,
    setRecentSongs,
    currSong,
    queue,
    setPrevSong,
    songs,
    setCurrSong,
    loop,
  } = useMainCtx();
  const [currTime, setCurrTime] = useState("");
  const [duration, setDuration] = useState("");
  const playerStatus = useAudioPlayerStatus(player);
  const changeSongHandler = () => {
    if (queue.length === 0) {
      changeSong(
        player,
        songs,
        setCurrSong,
        currSong,
        setPrevSong
      );
      return;
    }
    changeSongInQueue(
      player,
      queue,
      setCurrSong,
      currSong,
      setPrevSong
    );
  };
  useEffect(() => {
    if (playerStatus.didJustFinish && loop) {
      player.seekTo(0);
      return;
    }
    if (playerStatus.didJustFinish) {
      changeSongHandler();
    }
    if (playerStatus.playing) {
      const durationMinutes = Math.floor(
        playerStatus.duration / 60
      );
      const durationSeconds = Math.floor(
        playerStatus.duration % 60
      );
      setDuration(
        `${durationMinutes}:${
          durationSeconds > 10
            ? durationSeconds
            : "0" + durationSeconds
        }`
      );
    }

    if (showDuration) {
      const currMinutes = Math.floor(
        playerStatus.currentTime / 60
      );
      const currSeconds = Math.floor(
        playerStatus.currentTime % 60
      );
      setCurrTime(
        `${currMinutes}:${
          currSeconds > 9 ? currSeconds : "0" + currSeconds
        }`
      );
    }
  }, [
    showDuration,
    playerStatus.currentTime,
    playerStatus.didJustFinish,
  ]);
  useEffect(() => {
    isPlaying(playerStatus.playing);
  }, [playerStatus.playing]);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currSong && player.playing) {
        setRecentSongs((songs) => {
          const recentSongs = songs.filter(
            (songs) => songs.id !== currSong.id
          );
          const item = [currSong, ...recentSongs].slice(
            0,
            10
          );
          saveRecentSong(item);
          return item;
        });
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [player.playing]);
  if (showDuration) {
    return (
      <View style={styles.container}>
        <Text>{currTime}</Text>
        <Slider
          value={playerStatus.currentTime}
          onSlidingComplete={(value) =>
            player.seekTo(value)
          }
          thumbTintColor={colors.buttons}
          minimumTrackTintColor="white"
          maximumTrackTintColor={colors.buttons}
          maximumValue={player.duration}
          style={styles.musicDetailSlider}
        />
        <Text>{duration}</Text>
      </View>
    );
  } else {
    return (
      <Slider
        value={playerStatus.currentTime}
        onSlidingComplete={(value) => player.seekTo(value)}
        thumbTintColor="transparent"
        minimumTrackTintColor="white"
        maximumTrackTintColor="white"
        maximumValue={player.duration}
        style={
          showDuration
            ? styles.musicDetailSlider
            : styles.miniPlayerSlider
        }
      />
    );
  }
};

export default PlayerSlider;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  miniPlayerSlider: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "80%",
  },
  musicDetailSlider: {
    width: "70%",
    margin: 8,
  },
});

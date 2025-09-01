import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useMainCtx } from "../../Context/MainContext";
import Entypo from "@expo/vector-icons/Entypo";
import { playAndPause } from "../../Utils/playAndPause";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { changeSong } from "../../Utils/changeSong";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { playPreviousSong } from "../../Utils/playPreviousSong";
import { useNavigation } from "@react-navigation/native";
import { navigationType } from "../../Types/types";
import { changeSongInQueue } from "../../Utils/changeSongInQueue";
import PlayerSlider from ".././PlayerSlider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usethemeStore } from "../../Store/themeStore";
import { getStyles } from "./Style";
const MiniPlayer = () => {
  const colors = usethemeStore((state) => state.theme);
  const styles = getStyles(colors);
  const {
    player,
    currSong,
    setCurrSong,
    songs,
    setPrevSong,
    prevSong,
    queue,
    isPlaying,
    tabBarHeight,
  } = useMainCtx();
  const width = useWindowDimensions().width;
  const Bottominsets = useSafeAreaInsets().bottom;
  const navigation = useNavigation<navigationType>();
  const playAndPauseHandler = () => playAndPause(player);
  const changeSongHandler = () => {
    if (queue.length === 0) {
      changeSong(player, songs, setCurrSong, currSong, setPrevSong);
      return;
    }
    changeSongInQueue(player, queue, setCurrSong, currSong, setPrevSong);
  };

  const playPreviousSongHandler = () =>
    playPreviousSong(player, setCurrSong, prevSong, songs);
  const navigatieToMusicDetail = () =>
    navigation.navigate("MusicDetail", {
      item: currSong,
    });
  const progress = useSharedValue(0);
  const translateX = useSharedValue(0);
  const container = useAnimatedStyle(() => {
    return {
      bottom: tabBarHeight + Bottominsets,
      transform: [
        {
          translateY: interpolate(progress.value, [0, 1], [100, 0]),
        },
        {
          translateX: translateX.value,
        },
      ],
    };
  });
  const swipeGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
    })
    .onEnd(() => {
      if (translateX.value > 100) {
        runOnJS(playPreviousSongHandler)();
        translateX.value = withSpring(-100);
      }
      if (translateX.value < -100) {
        runOnJS(changeSongHandler)();
        translateX.value = withSpring(width + 100);
      }
      translateX.value = withSpring(0);
    });
  useEffect(() => {
    if (currSong) {
      progress.value = withSpring(1);
    }
    return () => {
      progress.value = withSpring(0);
      isPlaying(false);
    };
  }, [currSong]);
  if (currSong) {
    return (
      <GestureDetector gesture={swipeGesture}>
        <Animated.View style={[styles.container, container]}>
          <Pressable onPress={navigatieToMusicDetail}>
            <View style={styles.mainContainer}>
              <Image source={{ uri: currSong.img }} style={styles.img} />
              <View style={styles.textContainer}>
                <Text style={styles.text}>{currSong.name}</Text>
                <Text style={styles.text}>{currSong.artist}</Text>
              </View>
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={playAndPauseHandler}>
                  <Entypo
                    name={
                      player.playing ? "controller-paus" : "controller-play"
                    }
                    size={34}
                    color={colors.rare}
                  />
                </TouchableOpacity>
              </View>
              <PlayerSlider />
            </View>
          </Pressable>
        </Animated.View>
      </GestureDetector>
    );
  }
};
export default MiniPlayer;

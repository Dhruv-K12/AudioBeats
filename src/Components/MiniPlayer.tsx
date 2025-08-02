import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect } from "react";
import Slider from "@react-native-community/slider";
import { useMainCtx } from "../Context/MainContext";
import { colors } from "../Constants/colors";
import Entypo from "@expo/vector-icons/Entypo";
import { fonts } from "../Constants/fonts";
import { playAndPause } from "../Utils/playAndPause";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { changeSong } from "../Utils/changeSong";
import {
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import { playPreviousSong } from "../Utils/playPreviousSong";
const MiniPlayer = () => {
  const {
    playerStatus,
    player,
    currSong,
    setCurrSong,
    songs,
    setPrevSong,
    prevSong,
  } = useMainCtx();
  const width = useWindowDimensions().width;
  const playAndPauseHandler = () => playAndPause(player);
  const changeSongHandler = () =>
    changeSong(
      player,
      songs,
      setCurrSong,
      currSong,
      setPrevSong
    );
  const playPreviousSongHandler = () =>
    playPreviousSong(
      player,
      setCurrSong,
      prevSong,
      currSong
    );
  const progress = useSharedValue(0);
  const swipe = useSharedValue(0);
  const container = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            progress.value,
            [0, 1],
            [100, 0]
          ),
        },
        {
          translateX: swipe.value,
        },
      ],
    };
  });
  const swipeGesture = Gesture.Pan()
    .onUpdate((e) => {
      swipe.value = e.translationX;
    })
    .onEnd(() => {
      if (swipe.value > 100) {
        runOnJS(playPreviousSongHandler)();
        swipe.value = withSpring(-100);
      }
      if (swipe.value < -100) {
        runOnJS(changeSongHandler)();
        swipe.value = withSpring(width + 100);
      }
      swipe.value = withSpring(0);
    });
  useEffect(() => {
    if (currSong) {
      progress.value = withSpring(1);
    }
    if (playerStatus.didJustFinish) {
      changeSong(
        player,
        songs,
        setCurrSong,
        currSong,
        setPrevSong
      );
    }
  }, [currSong, playerStatus.didJustFinish]);
  if (currSong) {
    return (
      <GestureDetector gesture={swipeGesture}>
        <Animated.View
          style={[styles.container, container]}
        >
          <View style={styles.mainContainer}>
            <Image
              source={{ uri: currSong.img }}
              style={styles.img}
            />
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                {currSong.name}
              </Text>
              <Text style={styles.text}>
                {currSong.artist}
              </Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                onPress={playAndPauseHandler}
              >
                <Entypo
                  name={
                    player.playing
                      ? "controller-paus"
                      : "controller-play"
                  }
                  size={34}
                  color={colors.rare}
                />
              </TouchableOpacity>
            </View>
            <Slider
              value={playerStatus.currentTime}
              onSlidingComplete={(value) =>
                player.seekTo(value)
              }
              thumbTintColor="transparent"
              minimumTrackTintColor="white"
              maximumTrackTintColor="white"
              maximumValue={player.duration}
              style={styles.slider}
            />
          </View>
        </Animated.View>
      </GestureDetector>
    );
  }
};

export default MiniPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  mainContainer: {
    width: "95%",
    height: 70,
    backgroundColor: colors.buttons,
    borderRadius: 12,
    margin: 4,
    flexDirection: "row",
    elevation: 12,
    justifyContent: "space-between",
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 12,
  },
  textContainer: {
    margin: 8,
  },
  text: {
    fontFamily: fonts.subHeading,
    color: "white",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "40%",
  },
  slider: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "85%",
  },
  animation: {
    width: 30,
    height: 30,
  },
});

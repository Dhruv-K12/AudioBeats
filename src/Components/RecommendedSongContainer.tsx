import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { colors } from "../Constants/colors";
import { fonts } from "../Constants/fonts";
import { playSong } from "../Utils/playSong";
import { recommendedSongContainerProps } from "./types";
import Entypo from "@expo/vector-icons/Entypo";
import { useMainCtx } from "../Context/MainContext";
import { withSpring } from "react-native-reanimated";
import LottieView from "lottie-react-native";

const RecommendedSongContainer = ({
  item,
}: recommendedSongContainerProps) => {
  const { player, setCurrSong, sheetHeight, currSong } =
    useMainCtx();
  const playSongHandler = () => {
    setCurrSong(item);
    playSong(player, item.src);
  };
  const openBottomSheet = () => {
    sheetHeight.value = withSpring(1);
  };
  const refSoundAnimation = useRef<LottieView>(null);
  useEffect(() => {
    if (item !== currSong) {
      return;
    }
    if (player.playing) {
      refSoundAnimation.current?.play();
    } else {
      refSoundAnimation.current?.pause();
    }
  }, [player.playing]);
  return (
    <View style={styles.songContainer}>
      <TouchableOpacity
        style={styles.btn}
        onPress={playSongHandler}
      >
        <View style={styles.songContainer}>
          <Image
            source={{ uri: item.img }}
            style={styles.img}
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.artist}</Text>
          </View>
        </View>
        {currSong === item && (
          <LottieView
            source={require("../../assets/Animation/Sound Visualizer.json")}
            style={{
              width: 30,
              height: 30,
              alignSelf: "center",
            }}
            ref={refSoundAnimation}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={openBottomSheet}>
        <Entypo
          name="dots-three-vertical"
          size={24}
          color={colors.buttons}
        />
      </TouchableOpacity>
    </View>
  );
};

export default RecommendedSongContainer;

const styles = StyleSheet.create({
  songContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 3,
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  textContainer: {
    margin: 5,
  },
  text: {
    color: colors.buttons,
    fontFamily: fonts.subHeading,
  },
  btn: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
  },
});

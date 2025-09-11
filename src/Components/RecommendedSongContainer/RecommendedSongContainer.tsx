import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { playSong } from "../../Utils/playSong";
import { recommendedSongContainerProps } from "../types";
import Entypo from "@expo/vector-icons/Entypo";
import { useMainCtx } from "../../Context/MainContext";
import { ReduceMotion, withSpring } from "react-native-reanimated";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { navigationType } from "../../Types/types";
import { usethemeStore } from "../../Store/themeStore";
import { getStyles } from "./Style";
const RecommendedSongContainer = ({
  item,
  queue,
}: recommendedSongContainerProps) => {
  const colors = usethemeStore((state) => state.theme);
  const styles = getStyles(colors);
  const {
    player,
    setCurrSong,
    currSong,
    setSelectedSong,
    translateY,
    playing,
    setQueue,
  } = useMainCtx();
  const navigation = useNavigation<navigationType>();
  const playSongHandler = () => {
    if (currSong === item) {
      navigation.navigate("MusicDetail", {
        item: item,
      });
      return;
    }
    setQueue(queue ? queue : []);
    setCurrSong(item);
    playSong(player, item.src);
  };
  const openBottomSheet = () => {
    translateY.value = withSpring(0, {
      stiffness: 10,
      damping: 100,
      mass: 0.2,
      overshootClamping: false,
      reduceMotion: ReduceMotion.System,
    });
    setSelectedSong(item);
  };
  return (
    <View style={[styles.songContainer]}>
      <TouchableOpacity style={styles.btn} onPress={playSongHandler}>
        <View style={{ flexDirection: "row" }}>
          <Image source={{ uri: item.img }} style={styles.img} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.artist}</Text>
          </View>
        </View>
        {currSong === item && (
          <LottieView
            style={{
              width: 30,
              height: 30,
              alignSelf: "center",
            }}
            source={colors.visualizer}
            autoPlay={playing}
            loop={playing}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={openBottomSheet}>
        <Entypo name="dots-three-vertical" size={24} color={colors.buttons} />
      </TouchableOpacity>
    </View>
  );
};
export default RecommendedSongContainer;

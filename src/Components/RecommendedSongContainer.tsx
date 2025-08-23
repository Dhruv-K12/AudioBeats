import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { colors } from "../Constants/colors";
import { fonts } from "../Constants/fonts";
import { playSong } from "../Utils/playSong";
import { recommendedSongContainerProps } from "./types";
import Entypo from "@expo/vector-icons/Entypo";
import { useMainCtx } from "../Context/MainContext";
import {
  ReduceMotion,
  withSpring,
} from "react-native-reanimated";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { navigationType } from "../Types/types";
const RecommendedSongContainer = ({
  item,
  queue,
}: recommendedSongContainerProps) => {
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
      <TouchableOpacity
        style={styles.btn}
        onPress={playSongHandler}
      >
        <View style={{ flexDirection: "row" }}>
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
            autoPlay={playing}
            loop={playing}
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
    marginVertical: 8,
    borderBottomWidth: 0.8,
    borderColor: colors.buttons,
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

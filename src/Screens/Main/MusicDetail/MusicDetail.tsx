import { BackHandler, Dimensions, Image, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useMainCtx } from "../../../Context/MainContext";
import { playAndPause } from "../../../Utils/playAndPause";
import { useFocusEffect } from "@react-navigation/native";
import { songType } from "../../../Types/types";
import { changeSong } from "../../../Utils/changeSong";
import { playPreviousSong } from "../../../Utils/playPreviousSong";
import { playSong } from "../../../Utils/playSong";
import PlayerSlider from "../../../Components/PlayerSlider";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { saveFavourite } from "../../../Services/saveFavourite";
import { useAuthCtx } from "../../../Context/AuthContext";
import { removeFavourite } from "../../../Utils/removeFavourite";
import { downloadSong } from "../../../Utils/downloadSong";
import { deleteDownloadedSong } from "../../../Utils/deleteDownloadedSong";
import * as Progress from "react-native-progress";
import { usethemeStore } from "../../../Store/themeStore";
import { getStyles } from "./Style";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { rootMainStackParmList } from "../../../Navigation/type";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type musicDetailProps = NativeStackScreenProps<
  rootMainStackParmList,
  "MusicDetail"
>;
const MusicDetail = ({ navigation, route }: musicDetailProps) => {
  const colors = usethemeStore((state) => state.theme);
  const styles = getStyles(colors);
  const item = route.params?.item;
  const screenHeight = Dimensions.get("window").height;
  const insetsTop = useSafeAreaInsets().top;
  const translateY = useSharedValue(insetsTop);
  const { user, setError } = useAuthCtx();
  const [progress, setProgress] = useState(0);
  const {
    currSong,
    player,
    songs,
    setCurrSong,
    setPrevSong,
    prevSong,
    queue,
    favourite,
    downloadedSong,
    setDownloadedSong,
    setLoop,
    loop,
  } = useMainCtx();
  const isFavouriteSong = favourite.some((song) => song.id === currSong?.id);
  const isSongDownloaded = downloadedSong.some(
    (song) => song.id === currSong?.id
  );

  const playSongHandler = () => {
    if (!currSong && item) {
      setCurrSong(item);
      playSong(player, item?.src);
      return;
    }
    playAndPause(player);
  };
  const goBack = () => {
    translateY.value = withTiming(
      screenHeight,
      { duration: 300 },
      (finished) => {
        finished && runOnJS(navigation.goBack)();
      }
    );
    return true;
  };
  const changeSongHandler = () =>
    changeSong(
      player,
      queue.length !== 0 ? queue : songs,
      setCurrSong,
      currSong,
      setPrevSong
    );
  const playPreviousSongHandler = () =>
    playPreviousSong(
      player,
      setCurrSong,
      prevSong,
      queue.length !== 0 ? queue : songs
    );
  const closeSong = () => {
    player.replace("");
    player.remove();
    setCurrSong(null);
    setPrevSong([]);
    setLoop(false);
    goBack();
  };
  const addToFavouriteHandler = () => saveFavourite(user?.uid, currSong);

  const removeFavouriteHandler = () => {
    removeFavourite(user?.uid, currSong);
  };

  const downloadSongHandler = () =>
    downloadSong(
      currSong,
      setProgress,
      setError,
      downloadedSong,
      setDownloadedSong
    );
  const deleteSongHandler = async () => {
    const songs = await deleteDownloadedSong(currSong, downloadedSong);
    setDownloadedSong(songs as songType[]);
  };
  const loopHandler = () => {
    setLoop((state) => {
      if (state) {
        setError("Loop mode is off");
      } else {
        setError("Loop mode is on");
      }
      return !state;
    });
  };
  const slideDownGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationY > 0) {
        translateY.value = e.translationY;
      }
    })
    .onEnd(() => {
      if (translateY.value > screenHeight / 2) {
        runOnJS(goBack)();
      } else {
        translateY.value = withSpring(insetsTop, { damping: 100 });
      }
    });

  const container = useAnimatedStyle(() => ({
    flex: 1,
    transform: [{ translateY: translateY.value }],
    opacity: interpolate(
      translateY.value,
      [insetsTop, screenHeight / 2 - 50],
      [1, 0.8]
    ),
  }));
  useEffect(() => {
    if (currSong?.id !== item?.id) {
      navigation.navigate("MusicDetail", {
        item: currSong,
      });
    }
  }, [currSong?.id]);
  useFocusEffect(() => {
    const subscribtion = BackHandler.addEventListener(
      "hardwareBackPress",
      goBack
    );
    return () => subscribtion.remove();
  });
  return (
    <Animated.View style={container}>
      <SafeAreaView style={[styles.container]}>
        <GestureDetector gesture={slideDownGesture}>
          <View style={styles.header}>
            <AntDesign
              name="down"
              size={26}
              color={colors.buttons}
              onPress={goBack}
            />
            <Text style={styles.headerText}>{item?.name}</Text>
            <AntDesign
              name="close"
              size={26}
              color={colors.buttons}
              onPress={closeSong}
            />
          </View>
        </GestureDetector>
        <Image source={{ uri: item?.img }} style={styles.img} />
        <PlayerSlider showDuration />
        <View style={styles.functionalityContainer}>
          <AntDesign
            name="stepbackward"
            onPress={playPreviousSongHandler}
            size={34}
            color={colors.buttons}
          />
          <AntDesign
            onPress={playSongHandler}
            name={player.currentStatus.playing ? "pausecircle" : "play"}
            size={60}
            color={colors.buttons}
          />

          <AntDesign
            onPress={changeSongHandler}
            name="stepforward"
            size={34}
            color={colors.buttons}
          />
        </View>
        <View style={styles.bottomContainer}>
          <AntDesign
            name={isFavouriteSong ? "heart" : "hearto"}
            size={34}
            color={colors.buttons}
            onPress={
              isFavouriteSong ? removeFavouriteHandler : addToFavouriteHandler
            }
          />

          {progress == 0 || progress == 100 ? (
            <AntDesign
              name={isSongDownloaded ? "delete" : "download"}
              size={34}
              color={colors.buttons}
              onPress={
                isSongDownloaded ? deleteSongHandler : downloadSongHandler
              }
            />
          ) : (
            <Progress.Circle
              progress={progress}
              size={34}
              color={colors.buttons}
            />
          )}
          <MaterialIcons
            onPress={loopHandler}
            name="loop"
            size={34}
            color={loop ? "green" : colors.buttons}
          />
        </View>
      </SafeAreaView>
    </Animated.View>
  );
};

export default MusicDetail;

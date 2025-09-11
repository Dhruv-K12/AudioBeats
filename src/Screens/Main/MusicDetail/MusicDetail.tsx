import { BackHandler, Dimensions, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
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
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { rootMainStackParmList } from "../../../Navigation/type";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSongsStore } from "../../../Store/songsStore";
type musicDetailProps = NativeStackScreenProps<
  rootMainStackParmList,
  "MusicDetail"
>;
const MusicDetail = ({ navigation, route }: musicDetailProps) => {
  const colors = usethemeStore((state) => state.theme);
  const styles = getStyles(colors);
  const item = route.params?.item;
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  const translateY = useSharedValue(0);
  const translateXImage = useSharedValue(0);
  const { user, setError } = useAuthCtx();
  const [progress, setProgress] = useState(0);
  const songs = useSongsStore((state) => state.songs);
  const favourite = useSongsStore((state) => state.favourite);
  const {
    currSong,
    player,
    setCurrSong,
    setPrevSong,
    prevSong,
    queue,
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
        translateY.value = withSpring(0, { damping: 100 });
      }
    });

  const container = useAnimatedStyle(() => ({
    flex: 1,
    transform: [{ translateY: translateY.value }],
    opacity: interpolate(
      translateY.value,
      [0, screenHeight / 2 - 50],
      [1, 0.8]
    ),
  }));
  const image = useAnimatedStyle(() => ({
    transform: [{ translateX: translateXImage.value }],
    opacity: interpolate(
      translateXImage.value,
      [0, 150, screenWidth],
      [1, 0.8, 0]
    ),
  }));
  useEffect(() => {
    if (currSong?.id !== item?.id) {
      navigation.navigate("MusicDetail", {
        item: currSong,
      });
      translateXImage.value = withSequence(
        withSpring(-screenWidth, { duration: 300, stiffness: 200 }),
        withTiming(screenWidth, { duration: 0 }),
        withSpring(0, { mass: 0.3 })
      );
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
          <View>
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

            <Animated.Image
              source={{ uri: item?.img }}
              style={[styles.img, image]}
            />
          </View>
        </GestureDetector>
        <PlayerSlider showDuration />
        <View style={styles.functionalityContainer}>
          <AntDesign
            name="stepbackward"
            onPress={playPreviousSongHandler}
            size={32}
            color={colors.buttons}
          />
          <AntDesign
            onPress={playSongHandler}
            name={player.currentStatus.playing ? "pausecircle" : "play"}
            size={58}
            color={colors.buttons}
          />

          <AntDesign
            onPress={changeSongHandler}
            name="stepforward"
            size={32}
            color={colors.buttons}
          />
        </View>
        <View style={styles.bottomContainer}>
          <AntDesign
            name={isFavouriteSong ? "heart" : "hearto"}
            size={30}
            color={colors.buttons}
            onPress={
              isFavouriteSong ? removeFavouriteHandler : addToFavouriteHandler
            }
          />

          {progress == 0 || progress == 100 ? (
            <AntDesign
              name={isSongDownloaded ? "delete" : "download"}
              size={30}
              color={colors.buttons}
              onPress={
                isSongDownloaded ? deleteSongHandler : downloadSongHandler
              }
            />
          ) : (
            <Progress.Circle
              progress={progress}
              size={30}
              color={colors.buttons}
            />
          )}
          <MaterialIcons
            onPress={loopHandler}
            name="loop"
            size={30}
            color={loop ? "green" : colors.buttons}
          />
        </View>
      </SafeAreaView>
    </Animated.View>
  );
};

export default MusicDetail;

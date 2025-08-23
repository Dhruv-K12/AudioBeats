import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../Constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { routePropMusicDetail } from "./Type";
import { fonts } from "../../Constants/fonts";
import { useMainCtx } from "../../Context/MainContext";
import { playAndPause } from "../../Utils/playAndPause";
import { useNavigation } from "@react-navigation/native";
import {
  navigationType,
  songType,
} from "../../Types/types";
import { changeSong } from "../../Utils/changeSong";
import { playPreviousSong } from "../../Utils/playPreviousSong";
import { playSong } from "../../Utils/playSong";
import PlayerSlider from "../../Components/PlayerSlider";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { saveFavourite } from "../../Services/saveFavourite";
import { useAuthCtx } from "../../Context/AuthContext";
import { removeFavourite } from "../../Utils/removeFavourite";
import { downloadSong } from "../../Utils/downloadSong";
import { deleteDownloadedSong } from "../../Utils/deleteDownloadedSong";
import { withSpring } from "react-native-reanimated";
import * as Progress from "react-native-progress";
const MusicDetail = ({
  route,
}: {
  route: routePropMusicDetail;
}) => {
  const item = route.params?.item;
  const navigation = useNavigation<navigationType>();
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
  const isFavouriteSong = favourite.some(
    (song) => song.id === currSong?.id
  );
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
  const goBack = () => navigation.goBack();

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
  const addToFavouriteHandler = () =>
    saveFavourite(user?.uid, currSong);

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
    const songs = await deleteDownloadedSong(
      currSong,
      downloadedSong
    );

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
  useEffect(() => {
    if (currSong?.id !== item?.id) {
      navigation.navigate("MusicDetail", {
        item: currSong,
      });
    }
  }, [currSong?.id]);
  return (
    <SafeAreaView style={styles.container}>
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
      <Image
        source={{ uri: item?.img }}
        style={styles.img}
      />
      <PlayerSlider showDuration />
      <View style={styles.functionalityContainer}>
        <AntDesign
          onPress={playPreviousSongHandler}
          name="stepbackward"
          size={34}
          color={colors.buttons}
        />
        <AntDesign
          onPress={playSongHandler}
          name={
            player.currentStatus.playing
              ? "pausecircle"
              : "play"
          }
          size={58}
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
            isFavouriteSong
              ? removeFavouriteHandler
              : addToFavouriteHandler
          }
        />

        {progress == 0 || progress == 100 ? (
          <AntDesign
            name={isSongDownloaded ? "delete" : "download"}
            size={34}
            color={colors.buttons}
            onPress={
              isSongDownloaded
                ? deleteSongHandler
                : downloadSongHandler
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
          color={loop ? colors.rare : colors.buttons}
        />
      </View>
    </SafeAreaView>
  );
};

export default MusicDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    width: "95%",
    justifyContent: "space-between",
    margin: 8,
  },
  headerText: {
    color: "black",
    fontFamily: fonts.heading,
  },
  img: {
    width: "95%",
    height: "42%",
    resizeMode: "cover",
    borderRadius: 12,
    margin: 12,
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  slider: {
    width: "70%",
    margin: 8,
  },
  sliderText: {
    color: colors.buttons,
  },
  functionalityContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    alignItems: "center",
    margin: 12,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    margin: 16,
    alignSelf: "center",
  },
});

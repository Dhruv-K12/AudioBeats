import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useMainCtx } from "../../Context/MainContext";
import Entypo from "@expo/vector-icons/Entypo";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import SheetContent from "../SheetContent";
import { downloadSong } from "../../Utils/downloadSong";
import { useAuthCtx } from "../../Context/AuthContext";
import * as Progress from "react-native-progress";
import { deleteDownloadedSong } from "../../Utils/deleteDownloadedSong";
import { savePlaylist } from "../../Services/savePlaylist";
import { saveFavourite } from "../../Services/saveFavourite";
import { removeFavourite } from "../../Utils/removeFavourite";
import { songType } from "../../Types/types";
import { saveSongInPlaylist } from "../../Services/saveSongInPlaylist";
import { removeSongFromPlaylist } from "../../Services/removeSongFromPlaylist";
import { usethemeStore } from "../../Store/themeStore";
import { getStyles } from "./Style";
import { useSongsStore } from "../../Store/songsStore";
const BottomSheet = () => {
  const colors = usethemeStore((state) => state.theme);
  const favourite = useSongsStore((state) => state.favourite);
  const playlist = useSongsStore((state) => state.playlist);
  const styles = getStyles(colors);
  const { setError, user } = useAuthCtx();
  const { selectedSong, translateY, downloadedSong, setDownloadedSong } =
    useMainCtx();
  const [showplaylist, setShowPlaylist] = useState(false);
  const [playlistName, setPlaylistName] = useState("");

  const [progress, setProgress] = useState(0);
  const { height } = useWindowDimensions();
  const isSongDownloaded = downloadedSong.some(
    (song) => song.id == selectedSong?.id
  );
  const isFavouriteSong = favourite.some(
    (song) => song.id === selectedSong?.id
  );
  const sheetSize = height / 2;
  const showPlaylist = () => setShowPlaylist(true);
  const hidePlaylist = () => setShowPlaylist(false);

  const downloadSongHandler = () =>
    downloadSong(
      selectedSong,
      setProgress,
      setError,
      downloadedSong,
      setDownloadedSong
    );
  const deleteSongHandler = async () => {
    const songs = await deleteDownloadedSong(selectedSong, downloadedSong);

    setDownloadedSong(songs as songType[]);
  };
  const addToFavouriteHandler = () => saveFavourite(user?.uid, selectedSong);

  const removeFavouriteHandler = () => removeFavourite(user?.uid, selectedSong);
  const createPlaylistHandler = () => {
    if (playlistName.trim().length !== 0) {
      savePlaylist(user?.uid, playlistName);
    }
  };

  const slideDown = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationY > 0) {
        translateY.value = e.translationY;
      }
    })
    .onEnd(() => {
      if (translateY.value > sheetSize / 2) {
        translateY.value = withSpring(sheetSize);
        runOnJS(hidePlaylist)();
      } else {
        translateY.value = withSpring(0);
      }
    });
  const container = useAnimatedStyle(() => {
    return {
      height: sheetSize,
      opacity: interpolate(translateY.value, [0, sheetSize], [1, 0.6]),
      transform: [{ translateY: translateY.value }],
    };
  });
  useEffect(() => {
    if (
      selectedSong &&
      translateY.value >= 0 &&
      translateY.value <= sheetSize / 2
    ) {
      translateY.value = withTiming(
        sheetSize / 2,
        { duration: 300 },
        (finished) => {
          if (finished) {
            translateY.value = withTiming(0);
          }
        }
      );
    }
  }, [selectedSong?.id]);
  return (
    selectedSong && (
      <GestureDetector gesture={slideDown}>
        <Animated.View style={[styles.container, container]}>
          <Entypo
            name="chevron-down"
            size={30}
            color={colors.secondaryText}
            style={{ alignSelf: "center" }}
          />

          <View style={styles.songContainer}>
            <Image source={{ uri: selectedSong?.img }} style={styles.img} />
            <Text style={styles.txt}>{selectedSong?.name}</Text>
          </View>
          {!showplaylist ? (
            <>
              <SheetContent
                showArrow
                onPress={showPlaylist}
                text="Add To Playlist"
              >
                <MaterialIcons
                  name="library-music"
                  size={30}
                  color={colors.secondaryText}
                />
              </SheetContent>
              <SheetContent
                onPress={
                  isSongDownloaded ? deleteSongHandler : downloadSongHandler
                }
                text={isSongDownloaded ? "Delete Song" : "Download Song"}
              >
                {progress == 0 || progress == 100 ? (
                  <AntDesign
                    name={isSongDownloaded ? "delete" : "download"}
                    size={30}
                    color={colors.secondaryText}
                  />
                ) : (
                  <Progress.Circle
                    progress={progress}
                    size={30}
                    color={colors.secondaryText}
                  />
                )}
              </SheetContent>
              <SheetContent
                onPress={
                  isFavouriteSong
                    ? removeFavouriteHandler
                    : addToFavouriteHandler
                }
                text={
                  isFavouriteSong ? "Remove From Favourite" : "Add To Favourite"
                }
              >
                <AntDesign
                  name={isFavouriteSong ? "heart" : "hearto"}
                  size={30}
                  color={colors.secondaryText}
                />
              </SheetContent>
            </>
          ) : (
            <>
              <View style={styles.inputContainer}>
                <TouchableOpacity onPress={hidePlaylist}>
                  <AntDesign
                    name="arrowleft"
                    size={24}
                    color={colors.secondaryText}
                  />
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your playlist name"
                  value={playlistName}
                  onChangeText={(value) => setPlaylistName(value)}
                />
                <TouchableOpacity
                  onPress={createPlaylistHandler}
                  style={{
                    backgroundColor: colors.secondaryText,
                    borderRadius: 8,
                  }}
                >
                  <Text style={[styles.txt, { color: colors.buttons }]}>
                    Create
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={playlist}
                renderItem={({ item }) => {
                  const isPlaylistSongAdded = item.songs?.some(
                    (song) => song.id == selectedSong?.id
                  );
                  const saveSongHandler = () =>
                    isPlaylistSongAdded
                      ? removeSongFromPlaylist(
                          item,
                          user?.uid,
                          selectedSong,
                          setError
                        )
                      : saveSongInPlaylist(
                          item,
                          user?.uid,
                          selectedSong,
                          setError
                        );
                  return (
                    <View style={styles.playlistItem}>
                      <Text style={styles.txt}>{item.name}</Text>
                      <TouchableOpacity
                        onPress={saveSongHandler}
                        style={styles.addIconContainer}
                      >
                        <FontAwesome6
                          name={isPlaylistSongAdded ? "trash-can" : "add"}
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </>
          )}
        </Animated.View>
      </GestureDetector>
    )
  );
};

export default BottomSheet;

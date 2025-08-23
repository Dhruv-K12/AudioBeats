import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../Constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  navigationType,
  playlistType,
  songType,
} from "../../Types/types";
import { useMainCtx } from "../../Context/MainContext";
import { Chip } from "react-native-paper";
import RecommendedSongContainer from "../../Components/RecommendedSongContainer";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "../../Constants/fonts";
import AntDesign from "@expo/vector-icons/AntDesign";
const MySongs = () => {
  const {
    downloadedSong,
    favourite,
    playlist,
    setDialogAction,
    setSelectedPlaylist,
  } = useMainCtx();
  const [selected, setSelected] = useState("");
  const [data, setData] = useState<songType[]>([]);

  const [error, setError] = useState(
    "No music to show yet"
  );
  const isDownloadSelected = selected === "Downloads";
  const isFavouriteSelected = selected === "Favourites";
  const isPlaylistSelected = selected === "Playlist";
  const navigation = useNavigation<navigationType>();
  const selectHandler = (type: string) => {
    setSelected(selected === type ? "" : type);
    if (selected === type) {
      setData([]);
      setError("No music to show yet");
      return;
    }
    if (type === "Downloads") {
      if (downloadedSong.length === 0) {
        setError(
          "Your offline library is empty. Download songs to listen anytime."
        );
        return;
      }
      setData(downloadedSong);
    } else if (type == "Favourites") {
      if (favourite.length === 0) {
        setError(
          "You haven’t liked any songs yet. Tap the heart to add favourites."
        );
        return;
      }
      setData(favourite);
    } else {
      setError(
        "Your playlists are empty. Create one to start adding songs."
      );
      setData([]);
    }
    setError("");
  };
  const deletePlaylistHandler = (
    playlist: playlistType
  ) => {
    setDialogAction(
      "Are you sure want to delete this playlist"
    );
    setSelectedPlaylist(playlist);
  };

  useEffect(() => {
    if (isFavouriteSelected) {
      setData(favourite);
    } else if (isPlaylistSelected) {
    } else if (isDownloadSelected) {
      setData(downloadedSong);
    } else {
      setData([]);
    }
  }, [favourite, downloadedSong]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.optionsContainer}>
        <Chip
          icon={() => (
            <MaterialIcons
              name={
                isDownloadSelected ? "close" : "download"
              }
              size={24}
              color={
                isDownloadSelected
                  ? "white"
                  : colors.buttons
              }
            />
          )}
          style={
            isDownloadSelected
              ? styles.selectedChip
              : styles.unselectedChip
          }
          selectedColor={
            isDownloadSelected ? "white" : colors.buttons
          }
          onPress={() => selectHandler("Downloads")}
        >
          Downloads
        </Chip>
        <Chip
          icon={() => (
            <MaterialIcons
              name={isFavouriteSelected ? "close" : "star"}
              size={24}
              color={
                isFavouriteSelected
                  ? "white"
                  : colors.buttons
              }
            />
          )}
          onPress={() => selectHandler("Favourites")}
          style={
            isFavouriteSelected
              ? styles.selectedChip
              : styles.unselectedChip
          }
          selectedColor={
            isFavouriteSelected ? "white" : colors.buttons
          }
        >
          Favourites
        </Chip>
        <Chip
          icon={() => (
            <MaterialIcons
              name={isPlaylistSelected ? "close" : "album"}
              size={24}
              color={
                isPlaylistSelected
                  ? "white"
                  : colors.buttons
              }
            />
          )}
          onPress={() => selectHandler("Playlist")}
          style={
            isPlaylistSelected
              ? styles.selectedChip
              : styles.unselectedChip
          }
          selectedColor={
            isPlaylistSelected ? "white" : colors.buttons
          }
        >
          Playlist
        </Chip>
      </View>
      {isPlaylistSelected && (
        <FlatList
          data={playlist}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottomWidth: 0.2,
              }}
            >
              <Pressable
                style={styles.playlistContainer}
                onPress={() =>
                  navigation.navigate("PlaylistSongs", {
                    item: item.songs,
                  })
                }
              >
                <View
                  style={[
                    styles.playlistIcon,
                    { backgroundColor: item.color },
                  ]}
                >
                  <MaterialIcons
                    name="music-note"
                    size={40}
                    color={colors.buttons}
                  />
                </View>
                <Text style={styles.playlistText}>
                  {item.name}
                </Text>
              </Pressable>
              <TouchableOpacity
                onPress={() => deletePlaylistHandler(item)}
              >
                <AntDesign
                  name="delete"
                  size={24}
                  color={colors.buttons}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      {error.length !== 0 ? (
        <View style={styles.errorContainer}>
          <MaterialIcons
            name="music-note"
            size={40}
            color="black"
          />
          <Text>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <RecommendedSongContainer
              item={item}
              id={item.id}
              queue={data}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default MySongs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 8,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  selectedChip: {
    backgroundColor: colors.buttons,
  },
  unselectedChip: {
    backgroundColor: "white",
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    alignSelf: "center",
    padding: 8,
  },
  playlistContainer: {
    flexDirection: "row",
    margin: 10,
    width: "70%",
  },
  playlistIcon: {
    width: 50,
    height: 50,
    elevation: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginRight: 8,
  },

  playlistText: {
    fontFamily: fonts.subHeading,
  },
});

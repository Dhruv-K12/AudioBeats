import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useMainCtx } from "../Context/MainContext";
import { fonts } from "../Constants/fonts";
import { navigationType, songType } from "../Types/types";
import { useNavigation } from "@react-navigation/native";
import { playSong } from "../Utils/playSong";

const RecentSection = () => {
  const {
    recentSongs,
    currSong,
    setCurrSong,
    player,
    searchVal,
  } = useMainCtx();
  if (searchVal.trim().length !== 0) return;
  const navigation = useNavigation<navigationType>();
  const playSongHandler = (item: songType) => {
    if (currSong === item) {
      navigation.navigate("MusicDetail", {
        item: item,
      });
      return;
    }
    setCurrSong(item);
    playSong(player, item.src);
  };
  if (recentSongs.length !== 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Recently played</Text>
        <FlatList
          data={recentSongs}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => playSongHandler(item)}
              style={styles.btn}
            >
              <Image
                source={{ uri: item.img }}
                style={styles.img}
              />
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
};

export default RecentSection;

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
  heading: {
    fontFamily: fonts.heading,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
});

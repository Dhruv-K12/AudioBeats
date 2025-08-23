import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import RecommendedSongContainer from "../../Components/RecommendedSongContainer";
import { colors } from "../../Constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
const PlaylistSongs = ({ route }: any) => {
  const data = route.params.item;
  console.log(data);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.bg,
        padding: 8,
      }}
    >
      {data.length !== 0 ? (
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
      ) : (
        <View style={styles.errorContainer}>
          <MaterialIcons
            name="music-note"
            size={40}
            color="black"
          />
          <Text>No Music To Show Yet!</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default PlaylistSongs;

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    alignSelf: "center",
    padding: 8,
  },
});

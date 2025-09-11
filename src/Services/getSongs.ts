import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { songType } from "../Types/types";
import { useSongsStore } from "../Store/songsStore";

export const getSongs = () => {
  const unsubscribe = onSnapshot(collection(db, "songs"), (snapshot) => {
    const songs = snapshot.docs.map((song) => song.data() as songType);
    useSongsStore.getState().setSongs(songs);
  });
  return unsubscribe;
};

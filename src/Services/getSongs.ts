import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { songsState, songType } from "../Types/types";

export const getSongs = (setSongs: songsState) => {
  const unsubscribe = onSnapshot(collection(db, "songs"), (snapshot) => {
    const songs = snapshot.docs.map((song) => song.data() as songType);
    setSongs(songs);
  });
  return unsubscribe;
};

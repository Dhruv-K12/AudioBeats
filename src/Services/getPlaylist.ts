import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useSongsStore } from "../Store/songsStore";

export const getPlaylist = (uid: string) => {
  const unsubscribe = onSnapshot(
    collection(db, "Playlist", uid, "Name"),
    (snapshot) => {
      const playlist = snapshot.docs.map((each) => ({
        id: each.id,
        name: each.data().name,
        songs: each.data().songs,
        color: each.data().color,
      }));
      useSongsStore.getState().setPlaylist(playlist);
    }
  );
  return unsubscribe;
};

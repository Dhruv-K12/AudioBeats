import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { playlistType } from "../Types/types";

export const getPlaylist = (
  uid: string,
  setPlaylist: React.Dispatch<
    React.SetStateAction<playlistType[]>
  >
) => {
  const unsubscribe = onSnapshot(
    collection(db, "Playlist", uid, "Name"),
    (snapshot) => {
      const playlist = snapshot.docs.map((each) => ({
        id: each.id,
        name: each.data().name,
        songs: each.data().songs,
        color: each.data().color,
      }));
      setPlaylist(playlist);
    }
  );
  return unsubscribe;
};

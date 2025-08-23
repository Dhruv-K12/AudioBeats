import {
  arrayUnion,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import {
  playlistType,
  songType,
  stringState,
} from "../Types/types";

export const saveSongInPlaylist = async (
  playlist: playlistType,
  uid: string | undefined,
  songs: songType | null,
  setError: stringState
) => {
  if (!uid || !songs) return;
  try {
    await updateDoc(
      doc(db, "Playlist", uid, "Name", playlist.id),
      {
        songs: arrayUnion(songs),
      }
    );
    setError(
      ` ${songs.name} Added in ${playlist.name} playlist`
    );
  } catch (e) {
    console.log(e);
  }
};

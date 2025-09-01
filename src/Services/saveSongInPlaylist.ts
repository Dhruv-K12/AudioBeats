import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { playlistType, songType, stringState } from "../Types/types";

export const saveSongInPlaylist = async (
  playlist: playlistType,
  uid: string | undefined,
  songs: songType | null,
  setError: stringState
) => {
  if (!uid || !songs) return;
  try {
    await updateDoc(doc(db, "Playlist", uid, "Name", playlist.id), {
      songs: arrayUnion(songs),
    });
    const songName =
      songs.name.length > 8 ? songs.name.substring(0, 6) + "..." : songs.name;
    console.log(songName);
    setError(` ${songName} Added in ${playlist.name} playlist`);
  } catch (e) {
    console.log(e);
  }
};

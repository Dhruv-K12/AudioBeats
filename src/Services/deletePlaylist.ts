import { deleteDoc, doc } from "firebase/firestore";
import { playlistType, stringState } from "../Types/types";
import { db } from "../../firebaseConfig";

export const deletePlaylist = async (
  playlist: playlistType | null,
  uid: string | undefined,
  setError: stringState
) => {
  if (!uid || !playlist) return;
  try {
    await deleteDoc(
      doc(db, "Playlist", uid, "Name", playlist.id)
    );
    setError(`${playlist.name} playlist removed`);
  } catch (e) {
    console.log(e);
  }
};

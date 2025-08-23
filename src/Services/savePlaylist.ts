import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const savePlaylist = async (
  uid: string | undefined,
  PlaylistName: string
) => {
  try {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 30) + 40;
    const lightness = Math.floor(Math.random() * 20) + 70;
    if (uid) {
      await addDoc(
        collection(db, "Playlist", uid, "Name"),
        {
          name: PlaylistName,
          color: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
          songs: [],
        }
      );
    }
  } catch (e) {
    console.log(e);
  }
};

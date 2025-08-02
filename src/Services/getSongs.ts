import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const getSongs = (setSongs: any) => {
  try {
    const data = onSnapshot(
      collection(db, "songs"),
      (snapshot) => {
        const songs = snapshot.docs.map((song) =>
          song.data()
        );
        setSongs(songs);
      }
    );
    return data;
  } catch (e) {}
};

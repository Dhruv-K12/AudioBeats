import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { songsState, songType } from "../Types/types";
import { useSongsStore } from "../Store/songsStore";

export const getFavourite = (uid: string) => {
  const docRef = collection(db, "Favourite", uid, "Songs");
  const unsubscribe = onSnapshot(docRef, (snapshot) => {
    const favourite = snapshot.docs.map((each) => each.data() as songType);
    useSongsStore.getState().setFavourite(favourite);
  });
  return unsubscribe;
};

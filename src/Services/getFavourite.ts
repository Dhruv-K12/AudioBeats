import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { songsState, songType } from "../Types/types";

export const getFavourite = (
  uid: string,
  setFavourite: songsState
) => {
  const docRef = collection(db, "Favourite", uid, "Songs");
  const unsubscribe = onSnapshot(docRef, (snapshot) => {
    const favourite = snapshot.docs.map(
      (each) => each.data() as songType
    );

    setFavourite(favourite);
  });
  return unsubscribe;
};

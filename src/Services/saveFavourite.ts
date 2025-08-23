import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { songType } from "../Types/types";

export const saveFavourite = async (
  uid: string | undefined,
  songs: songType | null
) => {
  try {
    if (uid && songs) {
      await addDoc(
        collection(db, "Favourite", uid, "Songs"),
        {
          ...songs,
        }
      );
    }
  } catch (e) {
    console.log(e);
  }
};

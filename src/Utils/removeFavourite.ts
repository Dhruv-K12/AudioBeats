import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { songType } from "../Types/types";

export const removeFavourite = async (
  uid: string | undefined,
  song: songType | null
) => {
  try {
    if (!uid || !song) return;
    const docRef = query(
      collection(db, "Favourite", uid, "Songs"),
      where("id", "==", song?.id)
    );
    const data = await getDocs(docRef);
    Promise.all(data.docs.map((each) => each.id)).then(
      (id) => {
        deleteDoc(
          doc(db, "Favourite", uid, "Songs", id[0])
        );
      }
    );
  } catch (e) {
    console.log(e);
  }
};

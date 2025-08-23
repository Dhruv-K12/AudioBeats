import {
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { songsState, songType } from "../Types/types";
import { db } from "../../firebaseConfig";

export const searchSong = async (
  setSearchData: songsState,
  searchVal: string
) => {
  const docRef = collection(db, "songs");
  const docSnap = await getDocs(docRef);
  const searchedSong = Promise.all(
    docSnap.docs
      .map((song) => song.data())
      .filter(
        (song) =>
          song.name
            .toLowerCase()
            .includes(searchVal.toLowerCase()) ||
          song.artist
            .toLowerCase()
            .includes(searchVal.toLowerCase())
      )
  ).then((songs) => {
    setSearchData(songs as songType[]);
  });
};

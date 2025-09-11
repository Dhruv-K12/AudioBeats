import { create } from "zustand";
import { playlistType, songType } from "../Types/types";

export type songsType = {
  songs: songType[];
  setSongs: (songs: songType[]) => void;
  playlist: playlistType[];
  setPlaylist: (songs: playlistType[]) => void;
  favourite: songType[];
  setFavourite: (songs: songType[]) => void;
  recentSongs: songType[];
  setRecentSongs: (songs: songType[]) => void;
};

export const useSongsStore = create<songsType>((set) => ({
  songs: [],
  setSongs: (songs) => set({ songs: songs }),
  playlist: [],
  setPlaylist: (songs) => set({ playlist: songs }),
  favourite: [],
  setFavourite: (songs) => set({ favourite: songs }),
  recentSongs: [],
  setRecentSongs: (songs) => set({ recentSongs: songs }),
}));

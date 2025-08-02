import { User } from "firebase/auth";

export type booleanState = React.Dispatch<
  React.SetStateAction<boolean>
>;
export type userState = React.Dispatch<
  React.SetStateAction<User | undefined>
>;
export type stringState = React.Dispatch<
  React.SetStateAction<string>
>;

export type songsState = React.Dispatch<
  React.SetStateAction<songType[]>
>;
export type songState = React.Dispatch<
  React.SetStateAction<songType | null>
>;
export type songType = {
  artist: string;
  img: string;
  name: string;
  src: string;
};

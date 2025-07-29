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

import { User } from "firebase/auth";
import {
  booleanState,
  stringState,
  userState,
} from "../Types/types";

export type authCtx = {
  loading: boolean;
  setLoading: booleanState;
  user: User | undefined;
  setUser: userState;
  error: string;
  setError: stringState;
  splashLoading: boolean;
  setSplashLoading: booleanState;
};
export type authCtxProp = {
  children: React.ReactNode;
};

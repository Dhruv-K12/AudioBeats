import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "../../firebaseConfig";
import { stringState } from "../Types/types";

const auth = getAuth(app);
export const loginHandler = async (
  email: string,
  password: string,
  setError: stringState
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e: any) {
    if (e.code === "auth/invalid-credential") {
      setError("Your email pr password is incorrect ");
    }
  }
};

export const signUpHandler = async (
  email: string,
  password: string,
  name: string,
  setError: stringState
) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(response.user, {
      displayName: name,
    });
  } catch (e: any) {
    if (e.code === "auth/email-already-in-use") {
      setError("The email is already taken");
    }
  }
};

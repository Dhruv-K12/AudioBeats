import {
  loginHandler,
  signUpHandler,
} from "../Services/auth";
import { booleanState, stringState } from "../Types/types";

export const validateAuth = async (
  email: string,
  password: string,
  setLoading: booleanState,
  setError: stringState,
  name?: string
) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  if (isEmailValid && password.length >= 8) {
    setLoading(true);
    name === undefined
      ? await loginHandler(email, password, setError)
      : await signUpHandler(
          email,
          password,
          name,
          setError
        );
    setLoading(false);
  } else if (!isEmailValid) {
    setError("Your Email is not valid");
  } else {
    setError("Your password is not valid");
  }
};

import { createContext, useContext, useState } from "react";
import { User } from "firebase/auth";
import { authCtx, authCtxProp } from "./authContext.type";

const AuthContext = createContext<authCtx | null>(null);

export const AuthContextProvider = ({
  children,
}: authCtxProp) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();
  const [error, setError] = useState("");
  const [splashLoading, setSplashLoading] = useState(true);
  const value = {
    loading,
    setLoading,
    user,
    setUser,
    error,
    setError,
    splashLoading,
    setSplashLoading,
  };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthCtx = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("Its not wrapped up");
  }
  return ctx;
};

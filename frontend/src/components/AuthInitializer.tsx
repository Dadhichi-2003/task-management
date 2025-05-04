import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useSetAtom } from "jotai";
import { authUserAtom, tokenAtom } from "../atom/auth.atom";
import { auth } from "../firebase/firebase";

export const AuthInitializer = () => {
  const setAuthUser = useSetAtom(authUserAtom);
  const setToken = useSetAtom(tokenAtom);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setAuthUser(user);
        setToken(token);
      } else {
        setAuthUser(null);
        setToken(null);
      }
    });

    return () => unsubscribe();
  }, [setAuthUser, setToken]);

  return null; 
};

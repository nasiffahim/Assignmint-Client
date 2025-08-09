import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { app } from "../Firebase/Firebase.init";

const auth = getAuth(app);

export default function AuthProvider({ children }) {

  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email, passowrd) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, passowrd);
  };

  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData)
  }

  const logOut = () => {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
    });
    return () => {
        unsubscribe();
    };
  }, [])

  const authInfo = {
    user,
    setUser,
    loading,
    createUser,
    logIn,
    updateUser,
    logOut,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
}

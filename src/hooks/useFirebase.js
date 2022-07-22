import initializeAuthentication from "../Pages/Login/Firebase/firebase.init";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import axios from "axios";

initializeAuthentication();

const auth = getAuth();

const useFirebase = () => {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState("normal");
  const [error, setError] = useState(null);

  const signUpWithPassword = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithPassword = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  useEffect(() => {
    axios
      .get(`https://cryptic-mesa-14109.herokuapp.com/user/${user?.email}`)
      .then((result) => {
        setAdmin(result.data.role);
      });
  }, [user]);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setLoading(false);
    });
    return () => unSubscribe;
  }, []);

  const logout = () => {
    setLoading(true);
    signOut(auth).then(() => {
      setUser(null);
    });
  };

  return {
    signUpWithPassword,
    signInWithPassword,
    user,
    error,
    setError,
    setUser,
    updateUserProfile,
    logout,
    setLoading,
    isLoading,
    admin,
  };
};

export default useFirebase;

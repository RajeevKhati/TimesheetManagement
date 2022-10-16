import React, { useContext, useEffect, useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  provider,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const loginWithGoogle = () => {
    return signInWithPopup(auth, provider)
  };

  const value = {
    currentUser,
    signUp,
    login,
    logout,
    loginWithGoogle
  };
  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

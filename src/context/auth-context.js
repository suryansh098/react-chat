import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  currentUser: null,
  isLoggedIn: false,
  error: null,
  login: () => {},
  signup: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  const isLoggedIn = !!currentUser;

  const navigate = useNavigate();

  const loginHanlder = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message ?? "Something went wrong!");
    }
  };

  const signupHandler = async (displayName, email, password, file) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, res.user.uid);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          // update profile
          await updateProfile(res.user, {
            displayName,
            photoURL: downloadURL,
          });
          // create user on firestore
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });
          // create empty user chats on firestore
          await setDoc(doc(db, "userChats", res.user.uid), {});
          // navigate to home
          navigate("/");
        });
      });
    } catch (err) {
      setError(err.message ?? "Something went wrong!");
    }
  };

  const logoutHandler = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (currentUser) navigate("/");
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser, navigate]);

  const contextValue = {
    currentUser,
    isLoggedIn,
    error,
    login: loginHanlder,
    signup: signupHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

import { useContext, useState } from "react";
import {
  query,
  collection,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import AuthContext from "../../context/auth-context";
import ChatContext from "../../context/chat-context";
// import components
import User from "./User";
// import css module
import classes from "./Search.module.css";

const Search = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("email", "==", enteredEmail)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleKeyDown = (event) => {
    if (event.code === "Enter") {
      handleSearch();
    }
  };

  const handleSelect = async () => {
    // check whether the group exists in firestore, if not create it
    const groupId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", groupId));
      if (!res.exists()) {
        // create a chat in chats collection
        await setDoc(doc(db, "chats", groupId), { messages: [] });

        // create user chats for currentUser
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [groupId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [groupId + ".date"]: serverTimestamp(),
        });

        // create user chats for enteredUser
        await updateDoc(doc(db, "userChats", user.uid), {
          [groupId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [groupId + ".date"]: serverTimestamp(),
        });

        dispatch({
          type: "CHANGE_USER",
          payload: user,
        });
      } else {
        setError("No user found!");
      }
    } catch (err) {
      setError(err.message);
    }

    setUser(null);
    setEnteredEmail("");
  };

  return (
    <div className={classes["search"]}>
      <div className={classes["search-form"]}>
        <input
          type="text"
          placeholder="Search user by email..."
          value={enteredEmail}
          onChange={(e) => setEnteredEmail(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {error && <span>Something went wrong!</span>}
      {user && <User new user={user} onSelect={handleSelect} />}
    </div>
  );
};

export default Search;

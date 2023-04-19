import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth-context";
import ChatContext from "../../context/chat-context";
import { db } from "../../firebase";
// import components
import User from "./User";

const UserList = () => {
  const [users, setUsers] = useState({});

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getUsers = () => {
      const unsubscribe = onSnapshot(
        doc(db, "userChats", currentUser.uid),
        (doc) => {
          setUsers(doc.data());
        }
      );

      return () => {
        unsubscribe();
      };
    };
    currentUser.uid && getUsers();
  }, [currentUser.uid]);

  const handleSelect = (user) => {
    dispatch({
      type: "CHANGE_USER",
      payload: user,
    });
  };

  return (
    <div className="user-list">
      {users &&
        Object.entries(users)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((user) => (
            <User
              key={user[0]}
              user={{ ...user[1].userInfo }}
              lastMessage={user[1].lastMessage}
              onSelect={() => handleSelect(user[1].userInfo)}
            />
          ))}
          <hr/>
    </div>
  );
};

export default UserList;

import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import ChatContext from "../../context/chat-context";
import { db } from "../../firebase";
// import components
import Message from "./Message";
// import css module
import classes from "./Messages.module.css";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  const { data } = useContext(ChatContext);

  useEffect(() => {
    if (data.chatId) {
      const unsubscribe = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [data.chatId]);

  return (
    <div className={classes["messages"]}>
      {messages.map((message) => (
        <Message message={message} key={message.id} />
      ))}
    </div>
  );
};

export default Messages;

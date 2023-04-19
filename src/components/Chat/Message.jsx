import { useContext, useEffect, useRef } from "react";
import AuthContext from "../../context/auth-context";
import ChatContext from "../../context/chat-context";
// import css module
import classes from "./Message.module.css";

const Message = (props) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const messageRef = useRef();

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [props.message]);

  const isOwner = props.message.senderId === currentUser.uid;

  return (
    <div
      className={`${classes["message"]} ${isOwner && classes["owner"]}`}
      ref={messageRef}
    >
      <div className={classes["message-info"]}>
        <img
          src={isOwner ? currentUser.photoURL : data.user.photoURL}
          alt={isOwner ? currentUser.displayName : data.user.displayName}
        />
        <span>just now</span>
      </div>
      <div className={classes["message-content"]}>
        {props.message.text.length !== 0 && <p>{props.message.text}</p>}
        {props.message.img && (
          <img src={props.message.img} alt="Cannot load!" />
        )}
      </div>
    </div>
  );
};

export default Message;

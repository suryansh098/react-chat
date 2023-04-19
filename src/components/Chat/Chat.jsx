import { useContext } from "react";
// import icons
import CameraIcon from "../../assets/cam.png";
import AddFriendIcon from "../../assets/add.png";
import MoreIcon from "../../assets/more.png";
// import components
import Messages from "./Messages";
import MessageInput from "./MessageInput";
// import css module
import classes from "./Chat.module.css";
import ChatContext from "../../context/chat-context";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className={classes["chat"]}>
      <div className={classes["chat-info"]}>
        <span>{data.user.displayName}</span>
        <div className={classes["chat-actions"]}>
          <img src={CameraIcon} alt="video call" />
          <img src={AddFriendIcon} alt="add friend" />
          <img src={MoreIcon} alt="more options" />
        </div>
      </div>
      <Messages />
      <MessageInput />
    </div>
  );
};

export default Chat;

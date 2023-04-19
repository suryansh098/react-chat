// import css module
import classes from "./User.module.css";

const User = (props) => {
  return (
    <>
    <hr />
    <div className={classes["user-chat"]} onClick={props.onSelect}>
      <img src={props.user.photoURL} alt={props.user.displayName} />
      <div className={classes["user-chat-info"]}>
        <span>{props.user.displayName}</span>
        {!props.new && <p>{props.lastMessage?.text}</p>}
      </div>
    </div>
    </>
  );
};

export default User;

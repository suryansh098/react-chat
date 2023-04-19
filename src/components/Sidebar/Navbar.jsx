import { useContext } from "react";
import AuthContext from "../../context/auth-context";
// import css module
import classes from "./Navbar.module.css";

const Navbar = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className={classes["navbar"]}>
      <div className={classes["user"]}>
        <img src={authCtx.currentUser.photoURL} alt="" />
        <span>{authCtx.currentUser.displayName}</span>
      </div>
        <button className={classes["logout"]} onClick={() => authCtx.logout()}>logout</button>
    </div>
  );
};

export default Navbar;

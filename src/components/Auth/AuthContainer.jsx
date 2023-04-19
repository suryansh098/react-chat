import { useLocation } from "react-router-dom";
import { ReactSVG } from "react-svg";
import loginSvg from "../../assets/login.svg";
import signupSvg from "../../assets/signup.svg";
// import css module
import classes from "./AuthContainer.module.css";

const AuthContainer = (props) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className={classes["auth-container"]}>
      <div className={classes["left-container"]}>
        <ReactSVG src={isLoginPage ? loginSvg : signupSvg} />
      </div>
      <div className={classes["right-container"]}>
        <div className={classes["form-wrapper"]}>
          <h3 className={classes["logo"]}>React Chat</h3>
          <h4 className={classes["title"]}>{props.title}</h4>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;

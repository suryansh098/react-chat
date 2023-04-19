import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth-context";
// import icons
import AddAvatarIcon from "../../assets/addAvatar.png";
// import css module
import classes from "./SignUpForm.module.css";

const SignUpForm = () => {
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState(false);

  const authCtx = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const displayName = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const confirmPassword = event.target[3].value;
    const file = event.target[4].files[0];

    if (password !== confirmPassword) {
      setError(true);
      return;
    }
    authCtx.signup(displayName, email, password, file);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <label htmlFor="avatar" className={classes["avatar-label"]}>
          <img src={AddAvatarIcon} alt="add avatar" />
          <span>{avatar ? avatar : "Add an avatar"}</span>
        </label>
        <input
          type="file"
          id="avatar"
          style={{ display: "none" }}
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          accept="image/x-png,image/gif,image/jpeg"
        />
        <button type="submit">Register</button>
      </form>
      {authCtx.error && <span>{authCtx.error}</span>}
      {error && <span>Password and Confirm Password do not match!</span>}
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </>
  );
};

export default SignUpForm;

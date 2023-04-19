import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth-context";

const LoginForm = () => {
  const authCtx = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target[0].value;
    const password = event.target[1].value;

    authCtx.login(email, password);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      {authCtx.error && <span>{authCtx.error}</span>}
      <p>
        You don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </>
  );
};

export default LoginForm;

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/auth-context";

const ProtectedRoute = (props) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) return <Navigate to="/login" />;

  return props.children;
};

export default ProtectedRoute;

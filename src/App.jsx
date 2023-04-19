import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
// import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
// import global css
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;

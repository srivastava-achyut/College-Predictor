import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    // fake user for now
    login({ name: "Test User", email: "test@example.com" });
    navigate("/");
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login (Temporary)</button>
    </div>
  );
};

export default Login;

import {useAuth} from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const Header=() => {
    const {user, logout} = useAuth();
    const navigate=useNavigate();

    if(!user) return null;
    const handleLogout=()=>{
        logout();
        navigate("/login")

    }
    return (
    <div style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <span>Welcome, {user.name}</span>
      <button style={{ marginLeft: "20px" }} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );

}

export default Header
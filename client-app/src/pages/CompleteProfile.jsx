import { useState } from "react";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";

const CompleteProfile = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const submitHandler = async () => {
    await api.post("/auth/complete-profile", { name }); // JWT sent automatically
    navigate("/predict");
  };

  return (
    <div>
      <h2>Complete Your Profile</h2>
      <input
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={submitHandler}>Save</button>
    </div>
  );
};

export default CompleteProfile;

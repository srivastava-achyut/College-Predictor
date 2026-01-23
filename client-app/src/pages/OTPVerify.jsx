import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios"; // your axios instance with baseURL

const OTPVerify = ({ email, mobile }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitHandler = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/verify-otp", {
        email,
        mobile,
        otp,
      });

      // Save JWT in localStorage
      localStorage.setItem("token", response.data.token);

      // STEP 4.3: Check if profile is complete
      if (response.data.user.isProfileComplete) {
        navigate("/predict");          // User already has name
      } else {
        navigate("/complete-profile"); // Ask user to enter name
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Enter OTP</h2>
      <input
        type="text"
        placeholder="OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={submitHandler} disabled={loading}>
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default OTPVerify;

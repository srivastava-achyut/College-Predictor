import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  // STEP 1: Send OTP
  const sendOtp = async () => {
    if (!email && !mobile) {
      alert("Enter email or mobile");
      return;
    }

    await axios.post("http://localhost:5000/api/auth/send-otp", {
      email,
      mobile,
    });

    setOtpSent(true);
    alert("OTP sent");
  };

  // STEP 2: Verify OTP
  const verifyOtp = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/auth/verify-otp",
      { email, mobile, otp }
    );

    // Save token
    localStorage.setItem("token", res.data.token);

    // Save user in context + localStorage
    login(res.data.user);

    // STEP 4.3 redirect logic
    if (res.data.user.isProfileComplete) {
      navigate("/predict");
    } else {
      navigate("/complete-profile");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login with OTP</h2>

      {!otpSent ? (
        <>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br /><br />
          <input
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <br /><br />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      ) : (
        <>
          <input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <br /><br />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  );
};

export default Login;

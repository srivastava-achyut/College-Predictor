// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);

//   const navigate = useNavigate();
//   const { login } = useAuth();

//   // STEP 1: Send OTP
//   const sendOtp = async () => {
//     if (!email && !mobile) {
//       alert("Enter email or mobile");
//       return;
//     }

//     await axios.post("http://localhost:5000/api/auth/send-otp", {
//       email,
//       mobile,
//     });

//     setOtpSent(true);
//     alert("OTP sent");
//   };

//   // STEP 2: Verify OTP
//   const verifyOtp = async () => {
//     const res = await axios.post(
//       "http://localhost:5000/api/auth/verify-otp",
//       { email, mobile, otp }
//     );

//     // Save token
//     localStorage.setItem("token", res.data.token);

//     // Save user in context + localStorage
//     login(res.data.user);

//     // STEP 4.3 redirect logic
//     if (res.data.user.isProfileComplete) {
//       navigate("/predict");
//     } else {
//       navigate("/complete-profile");
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Login with OTP</h2>

//       {!otpSent ? (
//         <>
//           <input
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <br /><br />
//           <input
//             placeholder="Mobile"
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//           />
//           <br /><br />
//           <button onClick={sendOtp}>Send OTP</button>
//         </>
//       ) : (
//         <>
//           <input
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//           />
//           <br /><br />
//           <button onClick={verifyOtp}>Verify OTP</button>
//         </>
//       )}
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Styles.css"; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRequestOtp = async () => {
    if (!email && !mobile) return alert("Please enter your details.");
    try {
      await axios.post("http://localhost:5000/api/auth/send-otp", { email, mobile });
      setOtpSent(true);
    } catch (err) {
      alert("Verification failed to send.");
    }
  };

  const handleVerify = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", { email, mobile, otp });
      localStorage.setItem("token", res.data.token);
      login(res.data.user);
      navigate(res.data.user.isProfileComplete ? "/predict" : "/complete-profile");
    } catch (err) {
      alert("Invalid code.");
    }
  };

  const themeClass = isDarkMode ? "dark-theme" : "light-theme";

  return (
    <div className={`page-container ${themeClass}`}>
      <button className="theme-toggle-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
        {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <div className="glass-card">
        <div className="gradient-strip" />
        <h2>{otpSent ? "Verify Code" : "Welcome Back"}</h2>
        <p>{otpSent ? "Check your inbox or messages" : "Sign in to access the predictor"}</p>

        <div className="form-group">
          {!otpSent ? (
            <>
              <input 
                className="custom-input" 
                placeholder="Email Address" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              <span>OR</span>
              <input 
                className="custom-input" 
                placeholder="Mobile Number" 
                value={mobile} 
                onChange={(e) => setMobile(e.target.value)} 
              />
              <button className="action-button" onClick={handleRequestOtp}>Continue</button>
            </>
          ) : (
            <>
              <input 
                className="custom-input" 
                style={{ textAlign: 'center', letterSpacing: '4px' }}
                placeholder="OTP" 
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} 
              />
              <button className="action-button" onClick={handleVerify}>Login</button>
              <button style={{background: 'none', border: 'none', cursor: 'pointer'}} onClick={() => setOtpSent(false)}>
                Try another way
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

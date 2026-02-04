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
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // assuming backend sends token
      const token = res.data.token;

      if (token) {
        localStorage.setItem("token", token);
        navigate("/predict");
      } else {
        setError("Invalid login response");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back 👋</h2>
        <p style={styles.subtitle}>
          Login to continue to College Predictor
        </p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Email */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          {/* Password */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={styles.footer}>
          Don’t have an account?{" "}
          <span
            style={styles.link}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;

/* ===================== STYLES ===================== */

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },

  card: {
    background: "#fff",
    width: "100%",
    maxWidth: "400px",
    padding: "32px",
    borderRadius: "14px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
  },

  title: {
    textAlign: "center",
    fontSize: "26px",
    fontWeight: "600",
    marginBottom: "6px",
  },

  subtitle: {
    textAlign: "center",
    fontSize: "14px",
    color: "#666",
    marginBottom: "24px",
  },

  error: {
    background: "#ffe6e6",
    color: "#d8000c",
    padding: "8px",
    borderRadius: "6px",
    textAlign: "center",
    fontSize: "14px",
    marginBottom: "15px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  label: {
    fontSize: "13px",
    fontWeight: "500",
    color: "#444",
  },

  input: {
    padding: "11px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
  },

  button: {
    marginTop: "8px",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#667eea",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },

  footer: {
    marginTop: "22px",
    textAlign: "center",
    fontSize: "14px",
    color: "#555",
  },

  link: {
    color: "#667eea",
    fontWeight: "600",
    cursor: "pointer",
  },
};


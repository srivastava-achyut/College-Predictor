// import { useState } from "react";
// import api from "../utils/axios";

// function Predict() {
//   const [rank, setRank] = useState("");
//   const [category, setCategory] = useState("OPEN");
//   const [gender, setGender] = useState("male");
//   const [result, setResult] = useState([]);
//   const [hasSearched, setHasSearched] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setHasSearched(true);
//     setLoading(true);

//     try {
//       const res = await api.get("/predict", {
//         params: { rank, category, gender, _t: Date.now(),},
//       });
//       console.log("FULL RESPONSE:", res.data);

//       console.log("Frontend result:", res.data.colleges);
//       setResult(res.data.colleges || []);
//     } catch (err) {
//       console.error("Prediction error:", err);
//       setResult([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>College Predictor</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="number"
//           placeholder="Enter Rank"
//           value={rank}
//           onChange={(e) => setRank(e.target.value)}
//           required
//         />

//         <select value={category} onChange={(e) => setCategory(e.target.value)}>
//           <option value="OPEN">OPEN</option>
//           <option value="OBC">OBC</option>
//           <option value="SC">SC</option>
//           <option value="ST">ST</option>
//         </select>

//         <select value={gender} onChange={(e) => setGender(e.target.value)}>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//         </select>

//         <button type="submit">Predict</button>
//       </form>

//       {loading && <p>Predicting colleges...</p>}

//       {hasSearched && !loading && result.length > 0 && (
//         <div>
//           <h3>Predicted Colleges</h3>
//           <ul>
//             {result.map((c, index) => (
//               <li key={index}>
//                 <strong>{c.college}</strong> – {c.branch}
//                 <br />
//                 Rank Range: {c.opening} – {c.closing}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {hasSearched && !loading && result.length === 0 && (
//         <p>No colleges found</p>
//       )}
//     </div>
//   );
// }

// export default Predict;


import { useState } from "react";
import api from "../utils/axios";
import "./Styles.css";

function Predict() {
  const [rank, setRank] = useState("");
  const [category, setCategory] = useState("OPEN");
  const [gender, setGender] = useState("male");
  const [result, setResult] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handlePredict = async (e) => {
    e.preventDefault();
    setHasSearched(true);
    setLoading(true);
    try {
      const res = await api.get("/predict", { params: { rank, category, gender, t: Date.now() } });
      setResult(res.data.colleges || []);
    } catch (err) {
      setResult([]);
    } finally {
      setLoading(false);
    }
  };

  const themeClass = isDarkMode ? "dark-theme" : "light-theme";

  return (
    <div className={`page-container ${themeClass}`}>
      <button className="theme-toggle-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
        {isDarkMode ? "☀️ Light UI" : "🌙 Dark UI"}
      </button>

      <div className="glass-card">
        <div className="gradient-strip" />
        <h2>College Finder</h2>
        <p>Analyze your admission chances</p>

        <form onSubmit={handlePredict} className="form-group">
          <div className="field-wrapper">
            <label className="field-label">JEE Rank</label>
            <input className="custom-input" type="number" value={rank} onChange={(e) => setRank(e.target.value)} required />
          </div>

          <div className="input-row">
            <div className="field-wrapper">
              <label className="field-label">Category</label>
              <select className="custom-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="OPEN">OPEN</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
              </select>
            </div>
            <div className="field-wrapper">
              <label className="field-label">Gender</label>
              <select className="custom-input" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <button type="submit" className="action-button">
            {loading ? "Calculating..." : "Predict Now"}
          </button>
        </form>
      </div>

      {hasSearched && !loading && (
        <div className="results-wrapper">
          <h3>Predicted Opportunities</h3>
          {result.length > 0 ? result.map((c, i) => (
            <div key={i} className="college-item">
              <div className="college-main">
                <span className="college-title">{c.college}</span>
                <span className="branch-tag">{c.branch}</span>
              </div>
              <div className="cutoff-badge" style={{background: isDarkMode ? '#333' : '#f4f4f4'}}>
                <small>Cutoff Range</small>
                <div><strong>{c.opening} - {c.closing}</strong></div>
              </div>
            </div>
          )) : <p>No results match your criteria.</p>}
        </div>
      )}
    </div>
  );
}

export default Predict;
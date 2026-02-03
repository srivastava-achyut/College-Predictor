import { useState } from "react";
import api from "../utils/axios";

function Predict() {
  const [rank, setRank] = useState("");
  const [category, setCategory] = useState("OPEN");
  const [gender, setGender] = useState("male");
  const [result, setResult] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSearched(true);
    setLoading(true);

    try {
      const res = await api.get("/predict", {
        params: { rank, category, gender },
      });

      console.log("Frontend result:", res.data.colleges);
      setResult(res.data.colleges || []);
    } catch (err) {
      console.error("Prediction error:", err);
      setResult([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>College Predictor</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Enter Rank"
          value={rank}
          onChange={(e) => setRank(e.target.value)}
          required
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="OPEN">OPEN</option>
          <option value="OBC">OBC</option>
          <option value="SC">SC</option>
          <option value="ST">ST</option>
        </select>

        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <button type="submit">Predict</button>
      </form>

      {loading && <p>Predicting colleges...</p>}

      {hasSearched && !loading && result.length > 0 && (
        <div>
          <h3>Predicted Colleges</h3>
          <ul>
            {result.map((c, index) => (
              <li key={index}>
                <strong>{c.college}</strong> – {c.branch}
                <br />
                Rank Range: {c.opening} – {c.closing}
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasSearched && !loading && result.length === 0 && (
        <p>No colleges found</p>
      )}
    </div>
  );
}

export default Predict;

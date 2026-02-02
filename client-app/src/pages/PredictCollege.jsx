import { useState } from "react";
import api from "../utils/axios";

const PredictCollege = () => {
  const [rank, setRank] = useState("");
  const [category, setCategory] = useState("OPEN");
  const [gender, setGender] = useState("male");
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);

  const predictHandler = async () => {
    try {
      setLoading(true);
      const res = await api.get(
        `/predict/test?rank=${rank}&category=${category}&gender=${gender}`
      );
      setColleges(res.data.colleges);
    } catch (err) {
      console.error(err);
      alert("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Predict College</h2>

      <input
        type="number"
        placeholder="Enter Rank"
        value={rank}
        onChange={(e) => setRank(e.target.value)}
      />

      <br /><br />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="OPEN">OPEN</option>
        <option value="OBC">OBC</option>
        <option value="SC">SC</option>
        <option value="ST">ST</option>
      </select>

      <br /><br />

      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <br /><br />

      <button onClick={predictHandler} disabled={loading}>
        {loading ? "Predicting..." : "Predict College"}
      </button>

      <hr />

      {colleges.length > 0 && (
        <div>
          <h3>Predicted Colleges</h3>
          <ul>
            {colleges.map((college, index) => (
              <li key={index}>{college}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PredictCollege;

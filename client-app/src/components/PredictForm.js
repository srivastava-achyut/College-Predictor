import { useState } from "react";

function PredictForm() {
  const [rank, setRank] = useState("");
  const [category, setCategory] = useState("OPEN");
  const [gender, setGender] = useState("male");
  const [colleges, setColleges] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setColleges([]);

    try {
      const res = await fetch(
        `http://localhost:5000/api/predict/test?rank=${Number(
          rank
        )}&category=${category}&gender=${gender}`
      );

      const data = await res.json();
      console.log("API RESPONSE:", data);

      if (data.success) {
        setColleges(data.colleges);
      } else {
        setError("Prediction failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>JEE College Predictor</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Enter Rank"
          value={rank}
          onChange={(e) => setRank(e.target.value)}
          required
        />

        <br />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="OPEN">OPEN</option>
          <option value="OBC">OBC</option>
          <option value="SC">SC</option>
          <option value="ST">ST</option>
        </select>

        <br />

        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <br />
        <button type="submit">Predict</button>
      </form>

      <hr />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {colleges.length > 0 && (
        <div>
          <h3>Eligible Colleges</h3>
          <ul>
            {colleges.map((college, index) => (
              <li key={index}>{college}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PredictForm;

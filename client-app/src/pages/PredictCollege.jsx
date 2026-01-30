import { useEffect } from "react";
import api from "../utils/axios";

const PredictCollege = () => {
  useEffect(() => {
    const testApi = async () => {
      const res = await api.get("/predict");
      console.log(res.data);
    };
    testApi();
  }, []);

  return (
    <div>
      <h1>College Predictor</h1>
      <p>If you see this, auth is working 🎉</p>
    </div>
  );
};

export default PredictCollege;

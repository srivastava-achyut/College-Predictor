const express = require("express");
const cors = require("cors");

const app = express();

// Allow requests from frontend
app.use(cors());

// Parse JSON bodies
app.use(express.json());

const predictRoutes = require("./routes/predict.routes");
app.use("/api/predict", predictRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

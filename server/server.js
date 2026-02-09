require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const predictRoutes = require("./routes/predict.routes");

app.use(cors({
  origin:"https://https://college-predictor-frontend.onrender.com",
  credentials:true,
}));
app.use(express.json());
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);
app.use("/api/predict", predictRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

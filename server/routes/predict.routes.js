const express = require("express");
const router = express.Router();

const { jwtAuthMiddleware } = require("../utils/jwt");
const { predictCollege } = require("../controllers/predict.controller");

router.get("/test", predictCollege);

router.get("/", jwtAuthMiddleware, (req, res) => {
  console.log("predict route hit");
  res.json({
    success: true,
    message: "Predict route accessed",
    userId: req.user.id,
  });
});

module.exports = router;

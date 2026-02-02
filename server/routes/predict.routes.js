const express = require("express");
const router = express.Router();

const { jwtAuthMiddleware } = require("../utils/jwt");
const { predictCollege } = require("../controllers/predict.controller");

// test route (no auth)
router.get("/test", predictCollege);

// protected route
router.get("/", jwtAuthMiddleware, (req, res) => {
  console.log("predict route hit");

  res.json({
    success: true,
    message: "Predict route accessed",
    userId: req.user.id, // NOW SAFE
  });
});

module.exports = router;

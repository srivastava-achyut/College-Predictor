const express = require("express");
const router = express.Router();

const { predictCollege } = require("../controllers/predict.controller");

// Connect controller
router.get("/test", predictCollege);

module.exports = router;

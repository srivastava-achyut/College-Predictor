const express = require("express");
const router = express.Router();

const { jwtAuthMiddleware } = require("../utils/jwt");
const { predictCollege } = require("../controllers/predict.controller");

//THIS is the real predict route
router.post("/", jwtAuthMiddleware, predictCollege);

module.exports = router;

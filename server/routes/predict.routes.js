// const express = require("express");
// const router = express.Router();

// const { jwtAuthMiddleware } = require("../utils/jwt");
// const { predictCollege } = require("../controllers/predict.controller");

// // test route (no auth)


// // protected route
// router.get("/", jwtAuthMiddleware, (req, res) => {
//   console.log("predict route hit");
//   console.log("USER:", req.user);
//   res.json({
//     success: true,
//     message: "Predict route accessed",
//     userId: req.user.id, // NOW SAFE
//   });
// });
// router.get("/test", predictCollege);

// module.exports = router;
const express = require("express");
const router = express.Router();

const { jwtAuthMiddleware } = require("../utils/jwt");
const { predictCollege } = require("../controllers/predict.controller");

// ✅ THIS is the real predict route
router.get("/", jwtAuthMiddleware, predictCollege);

module.exports = router;

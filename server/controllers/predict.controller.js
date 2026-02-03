// const { predictColleges } = require("../services/predict.service");

// const predictCollege = (req, res) => {
//   let { rank, category, gender } = req.query;

//   rank = Number(rank);
//   category = category.trim();
//   gender = gender.trim();

//   console.log("Incoming params:", { rank, category, gender });

//   const result = predictColleges(rank, category, gender);

//   console.log("Predicted result:", result);

//   res.json({
//     success: true,
//     colleges: result,
//   });
// };

// module.exports = { predictCollege };
const { predictColleges } = require("../services/predict.service");

const predictCollege = (req, res) => {
  try {
    const { rank, category, gender } = req.query;

    console.log("--- DEBUG START ---");
    console.log("Query Received:", req.query);

    if (!rank || !category || !gender) {
      console.log("MISSING PARAMS!");
      return res.status(400).json({ success: false, message: "Missing parameters" });
    }

    const result = predictColleges(Number(rank), category.trim(), gender.trim());

    console.log("Service Result:", result);
    console.log("--- DEBUG END ---");

    return res.json({
      success: true,
      colleges: result,
    });
  } catch (err) {
    console.error("CONTROLLER ERROR:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { predictCollege };
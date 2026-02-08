const { predictColleges } = require("../services/predict.service");

const predictCollege = (req, res) => {
  let { rank, category, gender } = req.query;

  // coming from JWT middleware
  const homeState = req.user.homeState;

  rank = Number(rank);
  category = category.trim();
  gender = gender.trim();

  console.log("Incoming params:", { rank, category, gender, homeState });

  // 🔥 PASS homeState TO SERVICE
  const result = predictColleges(rank, category, gender, homeState);

  console.log("Predicted result:", result);

  res.json({
    colleges: result,
  });
};

module.exports = { predictCollege };

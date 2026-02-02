const { predictColleges } = require("../services/predict.service");

const predictCollege = (req, res) => {
  let { rank, category, gender } = req.query;

  rank = Number(rank);
  category = category.trim();
  gender = gender.trim();

  console.log("Incoming params:", { rank, category, gender });

  const result = predictColleges(rank, category, gender);

  console.log("Predicted result:", result);

  res.json({
    success: true,
    colleges: result,
  });
};

module.exports = { predictCollege };

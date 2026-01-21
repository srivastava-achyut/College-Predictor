const { predictColleges } = require("../services/predict.service");

const predictCollege = (req, res) => {
  let { rank, category, gender } = req.query; // using query for now

  rank =Number(rank)
  category=category.trim()
  gender=gender.trim()
  
  const result = predictColleges(rank, category, gender);

  res.json({
    success: true,
    colleges: result
  });
};

module.exports = { predictCollege };

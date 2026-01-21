const fs = require("fs");
const path = require("path");

const predictColleges = (rank, category, gender) => {
  const dataPath = path.join(__dirname, "../data/cutoffs.json");
  const colleges = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

 // console.log("Incoming:", { rank, category, gender });

  const result = colleges.filter(college => {
    const cutoff = college.cutoffs?.[category]?.[gender];
    //console.log("Checking college:", college.name, "cutoff:", cutoff);

    if (!cutoff) return false;

    return Number(rank) <= cutoff;
  });

  //console.log("Matched colleges:", result.map(c => c.name));
  return result.map(c => c.name);
};

module.exports = { predictColleges };

const fs = require("fs");
const path = require("path");

const predictColleges = (rank, category, gender, userHomeState) => {
  const dataPath = path.join(__dirname, "../data/cutoffs.json");
  const colleges = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

  const results = [];

  colleges.forEach((college) => {
    const quotaType =
      college.state === userHomeState ? "home" : "other";

    for (const branchName in college.branches) {
      const branch = college.branches[branchName];
      const categoryData = branch[category];
      if (!categoryData) continue;

      const quotaData = categoryData[quotaType];
      if (!quotaData) continue;

      const genderCutoff = quotaData[gender];
      if (!genderCutoff) continue;

      if (
        rank >= genderCutoff.opening &&
        rank <= genderCutoff.closing
      ) {
        results.push({
          college: college.name,
          branch: branchName,
          quota: quotaType,
          opening: genderCutoff.opening,
          closing: genderCutoff.closing
        });
      }
    }
  });

  return results;
};

module.exports = { predictColleges };

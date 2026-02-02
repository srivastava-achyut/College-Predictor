const fs = require("fs");
const path = require("path");

const predictColleges = (rank, category, gender) => {
  const dataPath = path.join(__dirname, "../data/cutoffs.json");
  const colleges = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

  const results = [];

  colleges.forEach((college) => {
    const branches = college.branches;

    if (!branches) return;

    Object.keys(branches).forEach((branchName) => {
      const branch = branches[branchName];
      const cutoff =
        branch?.[category]?.home?.[gender];

      if (!cutoff) return;

      if (rank >= cutoff.opening && rank <= cutoff.closing) {
        results.push({
          name: college.name,
          branch: branchName,
          opening: cutoff.opening,
          closing: cutoff.closing,
        });
      }
    });
  });

  return results;
};

module.exports = { predictColleges };

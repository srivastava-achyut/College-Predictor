// const fs = require("fs");
// const path = require("path");

// const predictColleges = (rank, category, gender) => {
//   const dataPath = path.join(__dirname, "../data/cutoffs.json");
//   const colleges = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

//   const results = [];

//   colleges.forEach((college) => {
//     const branches = college.branches;

//     for (const branchName in branches) {
//       const branch = branches[branchName];
//       const categoryData = branch[category];

//       if (!categoryData) continue;

//       const homeQuota = categoryData.home;
//       if (!homeQuota) continue;

//       const genderCutoff = homeQuota[gender];
//       if (!genderCutoff) continue;

//       if (rank >= genderCutoff.opening && rank <= genderCutoff.closing) {
//         results.push({
//           college: college.name,
//           branch: branchName,
//           opening: genderCutoff.opening,
//           closing: genderCutoff.closing,
//         });
//       }
//     }
//   });

//   return results;
// };

// module.exports = { predictColleges };
const fs = require("fs");
const path = require("path");

const predictColleges = (rank, category, gender) => {
  try {
    // 1. Ensure the filename matches your actual file (cutoff.json vs cutoffs.json)
    const dataPath = path.join(__dirname, "../data/cutoffs.json");
    
    if (!fs.existsSync(dataPath)) {
      console.error("Data file not found at:", dataPath);
      return [];
    }

    const fileContent = fs.readFileSync(dataPath, "utf-8");
    const colleges = JSON.parse(fileContent);

    const results = [];

    colleges.forEach((college) => {
      const branches = college.branches;

      for (const branchName in branches) {
        const branch = branches[branchName];
        
        // 2. Safely access category (e.g., "OPEN")
        const categoryData = branch[category];
        if (!categoryData) {
          console.log("skipping category")
          continue;
        }

        // 3. Access Quota (Currently hardcoded to 'home')
        const quotaData = categoryData.home;
        if (!quotaData) {
          console.log("skipping quotadata")
          continue;
        }

        // 4. Access Gender
        const genderCutoff = quotaData[gender];
        if (!genderCutoff){
             console.log("skipping gender cutoff")
             continue;
        } 

        /**
         * 5. LOGIC REPAIR: 
         * In entrance exams, a LOWER rank is better. 
         * If the closing rank is 1200 and your rank is 500, you ARE eligible.
         * Your old logic (rank >= opening) would exclude a rank of 400.
         */
        if (rank <= genderCutoff.closing) {
          results.push({
            college: college.name,
            branch: branchName,
            opening: genderCutoff.opening,
            closing: genderCutoff.closing,
            // Adding a 'status' makes the UI more helpful
            status: rank >= genderCutoff.opening ? "Highly Likely" : "Safe Bet",
          });
        }
      }
    });

    // Sort results so the best matches (closest to closing rank) appear first
    return results.sort((a, b) => a.closing - b.closing);

  } catch (error) {
    console.error("Error in predictColleges service:", error);
    return [];
  }
};

module.exports = { predictColleges };

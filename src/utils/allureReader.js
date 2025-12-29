const fs = require("fs");
const path = require("path");

function readAllureResults() {
  const allurePath = process.env.ALLURE_RESULTS_PATH;

  if (!fs.existsSync(allurePath)) {
    throw new Error("Allure results path tidak ditemukan");
  }

  const files = fs.readdirSync(allurePath);

  // ambil hanya *-result.json
  const resultFiles = files.filter(file =>
    file.endsWith("-result.json")
  );

  return resultFiles.map(file => {
    const fullPath = path.join(allurePath, file);
    const raw = fs.readFileSync(fullPath, "utf-8");
    return JSON.parse(raw);
  });
}

module.exports = { readAllureResults };

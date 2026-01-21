const fs = require("fs");
const path = require("path");

// Untuk membaca file hasil test allure
function readAllureResults() {
  const allurePath = process.env.ALLURE_RESULTS_PATH;

  // Pastikan path allure-results tersedia
  if (!fs.existsSync(allurePath)) {
    throw new Error("Allure results path not found: " + allurePath);
  }

  // Baca seluruh file dalam folder allure-results
  const files = fs.readdirSync(allurePath);

  // Ambil hanya file hasil test Allure (*-result.json)
  const resultFiles = files.filter((file) =>
    file.endsWith("-result.json")
  );

  // Parse setiap file JSON menjadi object
  return resultFiles.map((file) => {
    const fullPath = path.join(allurePath, file);
    const raw = fs.readFileSync(fullPath, "utf-8");
    return JSON.parse(raw);
  });
}

module.exports = { readAllureResults };

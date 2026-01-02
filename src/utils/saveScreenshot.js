const fs = require("fs");
const path = require("path");

function saveAllureScreenshot(allureResultDir, screenshotFileName) {
  if (!screenshotFileName) return null; // kembalikan null kalau tidak ada

  const sourcePath = path.join(allureResultDir, screenshotFileName);
  const targetDir = path.join(process.cwd(), "screenshots");
  const targetPath = path.join(targetDir, screenshotFileName);

  // pastikan folder screenshots ada
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  // kalau source file ada, copy
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, targetPath);
    console.log("✅ Screenshot copied:", screenshotFileName);
    return targetPath; // kembalikan path baru untuk simpan ke DB
  } else {
    console.warn("⚠️ Screenshot not found:", sourcePath);
    return null;
  }
}

module.exports = { saveAllureScreenshot };

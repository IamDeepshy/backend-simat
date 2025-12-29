const { syncAllureToDatabase } = require("../Services/allureSyncServices");

async function syncAllure(req, res) {
  try {
    const result = await syncAllureToDatabase();
    res.json({
      message: "Allure synced to database",
      result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal sync allure" });
  }
}

module.exports = { syncAllure };

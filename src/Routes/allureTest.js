const express = require("express");
const { readAllureResults } = require("../utils/allureReader");

const router = express.Router();

router.get("/allure/raw", (req, res) => {
  try {
    const results = readAllureResults();
    res.json({
      total: results.length,
      sample: results[0],
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

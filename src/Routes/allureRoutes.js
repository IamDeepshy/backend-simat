const express = require("express");
const { syncAllure } = require("../controllers/allureController");

const router = express.Router();

router.post("/allure/sync", syncAllure);

module.exports = router;

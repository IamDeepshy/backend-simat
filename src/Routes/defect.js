const express = require("express");
const router = express.Router();
const { createDefectController, getActiveDefectController } = require("../Controllers/defectController");

router.post("/defects", createDefectController);
router.get("/defects/active", getActiveDefectController);

module.exports = router;

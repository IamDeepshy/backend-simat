const express = require("express");
const router = express.Router();
const { createDefectController, getActiveDefectController } = require("../Controllers/defectController");
const authMiddleware = require("../Middleware/auth");
const requireQA = require("../Middleware/requireQA");

router.post("/defects", authMiddleware, requireQA, createDefectController);
router.get("/defects/active", authMiddleware, getActiveDefectController);

module.exports = router;

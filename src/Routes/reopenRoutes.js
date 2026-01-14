const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/auth");
const requireQA = require("../Middleware/requireQA");

const {
  completeTaskController,
  reopenTaskController,
} = require("../controllers/reopenController");

// REOPEN
router.patch(
  "/tasks/:id/reopen",
  authMiddleware,
  requireQA,
  reopenTaskController
);

// COMPLETE (HOLD BELUM FIX)
router.patch(
  "/tasks/:id/complete",
  authMiddleware,
  requireQA,
  completeTaskController
);

module.exports = router;

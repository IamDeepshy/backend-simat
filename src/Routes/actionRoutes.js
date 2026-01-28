const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/auth");
const requireQA = require("../Middleware/requireQA");
// Controller untuk reopen dan complete issue
const {
  completeTaskController,
  reopenTaskController,
} = require("../Controllers/actionController");

// REOPEN ROUTE
router.patch(
  "/issues/:id/reopen",
  authMiddleware, // cek token & set req.user
  requireQA, // cek role user dari req.user (harus QA)
  reopenTaskController // controller reopen issue
);

// COMPLETE
router.patch(
  "/issues/:id/complete",
  authMiddleware, // cek token & set req.user
  requireQA, // cek role user dari req.user (harus QA)
  completeTaskController // controller complete issue
);

module.exports = router;

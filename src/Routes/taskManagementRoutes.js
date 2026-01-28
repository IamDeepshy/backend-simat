const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/auth");
const { getTasksController, updateTaskStatusController } = require("../Controllers/taskManagementController");

// GET semua issue (filter via query)
router.get(
  "/issues",
  authMiddleware, // cek token & set req.user
  getTasksController // controller get issue
);

// UPDATE status issue
router.patch(
  "/issues/:id/status",
  authMiddleware,
  updateTaskStatusController
);

module.exports = router;

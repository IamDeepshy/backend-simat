const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const taskController = require("../controllers/taskManagementController");

// GET semua task (filter via query)
router.get(
  "/task-management",
  authMiddleware,
  taskController.getTasks
);

// UPDATE status task
router.patch(
  "/task-management/:id/status",
  authMiddleware,
  taskController.updateTaskStatus
);

module.exports = router;

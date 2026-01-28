const { reopenTask, completeTask } = require("../Services/actionServices");

// PATCH /api/issues/:id/reopen
const reopenTaskController = async (req, res) => {
  try {
    const taskId = Number(req.params.id);

    const updated = await reopenTask(taskId, req.user.id);
    return res.json({ data: updated });
  } catch (e) {
    const msg = e.message || "Failed to reopen issue";

    if (msg.toLowerCase().includes("not found")) {
      return res.status(404).json({ message: msg });
    }
    if (msg.toLowerCase().includes("has not been marked as done")) {
      return res.status(400).json({ message: msg });
    }

    return res.status(500).json({ message: "Failed to reopen issue" });
  }
};

// PATCH /api/issues/:id/complete
const completeTaskController = async (req, res) => {
  try {
    const taskId = Number(req.params.id);

    const updated = await completeTask(taskId);
    return res.json({ data: updated });
  } catch (e) {
    const msg = e.message || "Failed to complete issue";

    if (msg.toLowerCase().includes("not found")) {
      return res.status(404).json({ message: msg });
    }
    if (msg.toLowerCase().includes("has not been marked as done")) {
      return res.status(400).json({ message: msg });
    }

    return res.status(500).json({ message: "Failed to complete issue" });
  }
};

module.exports = {
  reopenTaskController,
  completeTaskController,
};

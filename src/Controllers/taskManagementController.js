const service = require("../Services/taskManagementServices");


exports.getTasks = async (req, res) => {
  try {
    const tasks = await service.getTasks({
      user: req.user,
      query: req.query,
    });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil task management" });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    if (req.user.role !== "dev") {
      return res
        .status(403)
        .json({ message: "Hanya developer yang boleh update status" });
    }

    await service.updateTaskStatus({
      taskId: Number(req.params.id),
      userId: req.user.id,
      newStatus: req.body.status,
    });

    res.json({ message: "Status updated" });
  } catch (err) {
    console.error("PATCH STATUS ERROR:", err);

    const code = err.code || 500;
    res.status(code).json({ message: err.message });
  }
};

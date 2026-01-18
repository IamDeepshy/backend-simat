const service = require("../Services/taskManagementServices");

// get task controller
exports.getTasks = async (req, res) => {
  try {
    const tasks = await service.getTasks({
      user: req.user, // ambil data user yang sedang login
      query: req.query, // query parameter (filter, pagination, dll)
    });
    // respon json: kirim data task ke fe
    res.json(tasks);
  } catch (err) {
    console.error(err);
    // jika error saat mengambil data task
    res.status(500).json({ 
      message: "Failed to retrieve task management data" 
    });
  }
};

// update task controller
exports.updateTaskStatus = async (req, res) => {
  try {
    // validasi role user (harus developer)
    if (req.user.role !== "dev") {
      return res
        .status(403)
        .json({ 
          message: "Only developers are allowed to update task status" 
        });
    }

    await service.updateTaskStatus({
      taskId: Number(req.params.id), // parameter ID task yang mau diupdate
      userId: req.user.id, // ID user yang melakukan update
      newStatus: req.body.status, // status baru dari request body
    });

    // jika berhasil
    res.json({ 
      message: "Task status successfully updated" 
    });
  } catch (err) {
    console.error("PATCH STATUS ERROR:", err);

    // default 500 (jika sistem tidak ada custom code error)
    const code = err.code || 500;
    res.status(code).json({ message: err.message });
  }
};

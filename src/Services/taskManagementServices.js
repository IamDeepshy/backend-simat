const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getTasks = async ({ user, query }) => {
  const {
    status = "all",
    priority = "all",
    assignee = "all",
    showHidden = "0",
  } = query;

  const where = {};

  if (showHidden !== "1") {
    where.is_hidden = false;
  }

  if (status !== "all") where.status = status;
  if (priority !== "all") where.priority = priority;

  if (user.role === "dev") {
    where.assignDevId = user.id;
  } else if (assignee !== "all") {
    where.assignDevId = Number(assignee);
  }

  return prisma.task_management.findMany({
    where,
    include: {
      assignDev: { select: { id: true, username: true } },
    },
    orderBy: { created_at: "desc" },
  });
};

exports.updateTaskStatus = async ({ taskId, userId, newStatus }) => {
  const allowed = ["To Do", "In Progress", "Done"];
  if (!allowed.includes(newStatus)) {
    const err = new Error("Status tidak valid");
    err.code = 400;
    throw err;
  }

  const task = await prisma.task_management.findFirst({
    where: {
      id: taskId,
      assignDevId: userId,
    },
  });

  if (!task) {
    const err = new Error("Task tidak ditemukan");
    err.code = 404;
    throw err;
  }

  // 🚫 RULE UTAMA
  if (task.status === "Done" && newStatus !== "Done") {
    const err = new Error(
      "Task yang sudah Done tidak boleh dikembalikan"
    );
    err.code = 400;
    throw err;
  }

  return prisma.task_management.update({
    where: { id: taskId },
    data: { status: newStatus },
  });
};

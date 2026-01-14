const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function completeTask(taskId, qaUser) {
  const task = await prisma.task_management.findUnique({
    where: { id: Number(taskId) },
  });

  if (!task) {
    throw new Error("Task tidak ditemukan");
  }

  if (task.status !== "Done") {
    throw new Error("Task belum berstatus Done");
  }

  // soft hide
  return prisma.task_management.update({
    where: { id: task.id },
    data: {
      is_hidden: true,
      updated_at: new Date(),
    },
  });
}

module.exports = {
  completeTask,
};

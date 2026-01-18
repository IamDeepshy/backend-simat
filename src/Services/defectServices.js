const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// status yang artinya defect masih di-handle.
const ACTIVE_STATUSES = ["To Do", "In Progress", "Done"];

// normalisasi input priority
function normalizePriority(priority) {
  // ubah ke lowercase & trim supaya input fleksibel (" HIGH ", "High", dll)
  const v = (priority || "").toLowerCase().trim();
  if (v === "high") return "High";
  if (v === "medium") return "Medium";
  if (v === "low") return "Low";
  throw new Error("Priority tidak valid");
}

// service untuk create defect 
async function createDefect(payload) {
  const {
    testSpecId,
    testCaseId,
    title,
    assignDevId,
    priority,
    notes,
  } = payload;

  // validasi wajib isi: title, assignDevId, priority
  if (!title || !assignDevId || !priority) {
    throw new Error("Title, assigned developer, and priority are required");
  }
  // validasi panjang karakter notes
  if (notes && notes.length > 255) {
    throw new Error("Notes must not exceed 255 characters");
  }

  if (!testSpecId && !testCaseId) {
    throw new Error("Either testSpecId or testCaseId is required");
  }

  // cari test_spec untuk ambil suiteName
  const testSpec = await prisma.test_specs.findFirst({
    where: testSpecId
      ? { id: Number(testSpecId) } // kalau testSpecId ada, request string -> jadi number
      : { testCaseId }, // kalau tidak ada, tidak di-number
    select: { suiteName: true },
  });

  if (!testSpec) {
    throw new Error("test specs not found");
  }

  // create -> insert record baru ke table task management
  return prisma.task_management.create({
    data: {
      suiteName: testSpec.suiteName,
      title,
      assignDevId: Number(assignDevId),
      priority: normalizePriority(priority),
      status: "To Do",
      notes: notes?.trim() || "",
    },
  });
}

// service ambil defect aktif based on testspecid
async function getActiveDefectByTestSpecId(testSpecId) {
  if (!testSpecId) throw new Error("testSpecId must be sent");

  // ambil suiteName dr test spec berdasarkan id
  const testSpec = await prisma.test_specs.findFirst({
    where: { id: Number(testSpecId) },
    select: { suiteName: true },
  });

  // return null, kalau gaada
  if (!testSpec) return null;

  // cari defect aktif berdasarkan suiteName
  const activeDefect = await prisma.task_management.findFirst({
    where: {
      suiteName: testSpec.suiteName,
      status: { in: ACTIVE_STATUSES },
      is_hidden: false,  
    },
    select: {
      id: true, 
      assignDev: { select: { id: true, username: true } },
      priority: true,
      status: true,
      created_at: true, 
      updated_at: true, 

      reopenedAt: true,
      reopenedBy: true,
      reopened_by: { select: { id: true, username: true } },
    },
    orderBy: { id: "desc" }, // descending, ambil yg terbaru (paling besar)
  });

  return activeDefect;
}

module.exports = { createDefect, getActiveDefectByTestSpecId };
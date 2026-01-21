const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { getLatestAllureSummary } = require("./getLatestAllure");

//  Menyimpan atau memperbarui data test_run TERBARU berdasarkan hasil eksekusi Jenkins + Allure terakhir.

async function saveLatestTestRun({ scope, target }) {
  console.log("saveLatestTestRun CALLED WITH:", scope, target);

  // Validasi parameter wajib
  if (!scope || !target) {
    throw new Error(" 'scope' and 'target' parameters are required.");
  }

  // Ambil summary Allure terbaru dari Jenkins
  const summary = await getLatestAllureSummary();

  // Total fail mencakup failed + broken
  const totalFail = summary.failed + summary.broken;
  const status = totalFail > 0 ? "FAILED" : "PASSED";

  // Simpan atau update test_run
  return prisma.test_run.upsert({
    where: {
      scope_scopeValue: {
        scope,
        scopeValue: target,
      },
    },
    update: {
      totalPass: summary.passed,
      totalFail,
      status,
      executedAt: new Date(),
      allureUrl: `/job/eksekusi-ulang/${summary.buildNumber}/allure`,
    },
    create: {
      scope,
      scopeValue: target,
      totalPass: summary.passed,
      totalFail,
      status,
      executedAt: new Date(),
      allureUrl: `/job/eksekusi-ulang/${summary.buildNumber}/allure`,
    },
  });
}

module.exports = { saveLatestTestRun };

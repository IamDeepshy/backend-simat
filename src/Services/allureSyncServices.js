const { readAllureResults } = require("../utils/allureReader");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function syncAllureToDatabase() {
  const results = readAllureResults();

  // HITUNG SUMMARY
  const totalPass = results.filter(r => r.status === "passed").length;
  const totalFail = results.filter(r => r.status === "failed").length;
  const totalBroken = results.filter(r => r.status === "broken").length;
  const status = totalFail > 0 ? "FAILED" : "PASSED";

  // UPSERT test_run (ALL)
  const testRun = await prisma.test_run.upsert({
    where: {
      scope_scopeValue: {
        scope: "ALL",
        scopeValue: "ALL",
      },
    },
    update: {
      totalPass,
      totalFail,
      status,
      executedAt: new Date(),
      allureUrl: "/job/eksekusi-ulang/allure",
    },
    create: {
      scope: "ALL",
      scopeValue: "ALL",
      totalPass,
      totalFail,
      status,
      executedAt: new Date(),
      allureUrl: "/job/eksekusi-ulang/allure",
    },
  });

  // LOOP DETAIL TEST
  for (const test of results) {
    const suiteLabel = test.labels?.find(l => l.name === "suite");
    const suiteName = suiteLabel?.value || "UNKNOWN";

    const durationMs = test.stop && test.start
      ? test.stop - test.start
      : 0;

    const errorMessage =
      ["failed", "broken"].includes(test.status)
        ? test.statusDetails?.message || test.statusDetails?.trace || null
        : null;


    const screenshot =
      test.attachments?.find(a => a.type?.includes("image"))?.source || null;

    await prisma.test_specs.upsert({
      where: {
        testCaseId: test.testCaseId,
      },
      update: {
        suiteName,
        testName: test.name,
        status: test.status.toUpperCase(),
        durationMs,
        errorMessage,
        screenshotUrl: screenshot,
        lastRunAt: new Date(),
        runId: testRun.id,
      },
      create: {
        testCaseId: test.testCaseId,
        suiteName,
        testName: test.name,
        status: test.status.toUpperCase(),
        durationMs,
        errorMessage,
        screenshotUrl: screenshot,
        lastRunAt: new Date(),
        runId: testRun.id,
      },
    });
  }

  return {
    total: results.length,
    totalPass,
    totalFail,
    totalBroken,
  };
}

module.exports = { syncAllureToDatabase };

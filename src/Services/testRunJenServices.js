const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { getLatestAllureSummary } = require('./jenkinsServices')

async function saveLatestTestRun({ scope, scopeValue }) {
  const summary = await getLatestAllureSummary();

  const status = summary.failed > 0 ? 'FAILED' : 'PASSED';

  return prisma.test_run.upsert({
    where: {
      scope_scopeValue: { scope, scopeValue }
    },
    update: {
      totalPass: summary.passed,
      totalFail: summary.failed + summary.broken,
      status,
      executedAt: new Date(),
      allureUrl: `/job/eksekusi-ulang/${summary.buildNumber}/allure`,
    },
    create: {
      scope,
      scopeValue,
      totalPass: summary.passed,
      totalFail: summary.failed + summary.broken,
      status,
      executedAt: new Date(),
      allureUrl: `/job/eksekusi-ulang/${summary.buildNumber}/allure`,
    },
  });
}


module.exports = { saveLatestTestRun }

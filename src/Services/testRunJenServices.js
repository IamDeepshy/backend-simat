const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { getLatestAllureSummary } = require('./jenkinsServices')

async function saveLatestTestRun() {
  const summary = await getLatestAllureSummary()

  const status = summary.failed > 0 ? 'FAILED' : 'PASSED'

  return prisma.test_run.upsert({
    where: {
      scope_scopeValue: {
        scope: 'ALL',
        scopeValue: 'ALL'
      }
    },
    update: {
      totalPass: summary.passed,
      totalFail: summary.failed,
      status,
      executedAt: new Date(),
      allureUrl: `/job/eksekusi-ulang/${summary.buildNumber}/allure`
    },
    create: {
      scope: 'ALL',
      scopeValue: 'ALL',
      totalPass: summary.passed,
      totalFail: summary.failed,
      status,
      executedAt: new Date(),
      allureUrl: `/job/eksekusi-ulang/${summary.buildNumber}/allure`
    }
  })
}

module.exports = { saveLatestTestRun }

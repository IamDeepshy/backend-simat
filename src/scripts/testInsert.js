// testInsert.js
const prisma = require("../utils/prisma");

async function main() {
  await prisma.test_run.create({
    data: {
      scope: 'ALL',
      scopeValue: 'ALL',
      totalPass: 0,
      totalFail: 0,
      status: 'IN_PROGRESS',
      allureUrl: '',
      executedAt: new Date()
    }
  })

  console.log('INSERT OK')
}

main()

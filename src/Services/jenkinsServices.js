const axios = require('axios')

const JENKINS_BASE_URL = 'http://localhost:8080'
const JOB_NAME = 'eksekusi-ulang'
const AUTH = {
  username: 'nadhif',
  password: '1176ff5d99c821188b57dfa71b61257bcd'
}

async function getLatestAllureSummary() {
  // 1. ambil build terakhir
  const buildRes = await axios.get(
    `${JENKINS_BASE_URL}/job/${JOB_NAME}/lastBuild/api/json`,
    { auth: AUTH }
  )

  const buildNumber = buildRes.data.number

  // 2. ambil allure summary
  const allureRes = await axios.get(
    `${JENKINS_BASE_URL}/job/${JOB_NAME}/${buildNumber}/allure/widgets/summary.json`,
    { auth: AUTH }
  )

  return {
    buildNumber,
    ...allureRes.data.statistic
  }
}

module.exports = { getLatestAllureSummary }

const axios = require("axios");

const JENKINS_BASE_URL = "http://localhost:8080";
const JOB_NAME = "eksekusi-ulang";

// pakai user + api token Jenkins
const JENKINS_USER = process.env.JENKINS_USER;
const JENKINS_TOKEN = process.env.JENKINS_TOKEN;

async function triggerRerunSpec(specPath) {
  const url = `${JENKINS_BASE_URL}/job/${JOB_NAME}/buildWithParameters`;

  return axios.post(
    url,
    null,
    {
      params: {
        SPEC: specPath
      },
      auth: {
        username: JENKINS_USER,
        password: JENKINS_TOKEN
      }
    }
  );
}

module.exports = { triggerRerunSpec };

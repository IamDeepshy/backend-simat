const axios = require("axios");

const JENKINS_BASE_URL = process.env.JENKINS_URL;
const JOB_NAME = "eksekusi-ulang";

const JENKINS_USER = process.env.JENKINS_USER;
const JENKINS_TOKEN = process.env.JENKINS_TOKEN;

// Normalisasi spec path (hilangkan bagian setelah #)
function normalizeSpecPath(specPath) {
  if (!specPath) return null;
  return specPath.split("#")[0];
}
// Mentrigger Jenkins untuk Rerun satu spec dengan parameter yang sudah di normalisasi
async function triggerRerunSpec(specPath) {
  // Bersihkan spec path agar sesuai format Jenkins
  const cleanSpec = normalizeSpecPath(specPath);

  const url = `${JENKINS_BASE_URL}/job/${JOB_NAME}/buildWithParameters`;

  const response = await axios.post(
    url,
    null,
    {
      params: {
        SPEC: cleanSpec,
      },
      auth: {
        username: JENKINS_USER,
        password: JENKINS_TOKEN,
      },
    }
  );

  /**
   * Jenkins mengirim lokasi queue item di response header.
   * Header ini digunakan untuk melacak status build -> hingga mendapatkan buildNumber.
   */
  const queueUrl = response.headers.location;

  return {
    queueUrl,
    spec: cleanSpec,
  };
}

module.exports = { triggerRerunSpec };

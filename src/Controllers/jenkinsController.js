const { triggerRerunSpec } = require("../services/jenkinsWithParam");
const { resolveQueue } = require("../services/jenkinsQueueResolver");
const { getBuildProgress } = require("../services/jenkinsProgress");
const { get } = require("../Routes/jenkinsRoutes");

async function rerunSpec(req, res) {
  try {
    const { spec } = req.body;

    if (!spec) {
      return res.status(400).json({ message: "SPEC wajib diisi" });
    }

    //  ambil hasil trigger Jenkins
    const { queueUrl, spec: cleanSpec } = await triggerRerunSpec(spec);

    return res.json({
      message: "Rerun spec berhasil ditrigger",
      spec: cleanSpec,
      queueUrl, 
    });
  } catch (err) {
    console.error("Rerun Jenkins error:", err.message);
    return res.status(500).json({ message: "Gagal trigger Jenkins" });
  }
}

async function resolveQueueBuild(req, res) {
  try {
    const { queueUrl } = req.query;

    if (!queueUrl) {
      return res.status(400).json({ message: "queueUrl wajib" });
    }

    const result = await resolveQueue(queueUrl);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

async function getBuildProgressController(req, res) {
  try {
    const { buildNumber } = req.params;
    const data = await getBuildProgress(buildNumber);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal ambil progress Jenkins" });
  }
}

module.exports = { rerunSpec, resolveQueueBuild, getBuildProgressController };

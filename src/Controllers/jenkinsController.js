const { triggerRerunSpec } = require("../services/jenkinsWithParam");
const { resolveQueue } = require("../services/jenkinsQueueResolver");
const { getBuildProgress } = require("../services/jenkinsProgress");
const { get } = require("../Routes/jenkinsRoutes");
const { saveLatestTestRun } = require("../services/testRunJenServices");

const defectServices = require("../services/defectServices"); // sesuaikan path
// misal exported: { getActiveDefectByTestSpecId }

async function rerunSpec(req, res) {
  try {
    const { scope, target, testSpecId } = req.body;
    // console.log("cookies:", req.cookies);
    // console.log("user:", req.user);

    // 1) validasi
    if (!target) return res.status(400).json({ message: "target wajib" });
    if (!testSpecId) return res.status(400).json({ message: "testSpecId wajib" });

    // 2) ambil role user (asumsi sudah ada auth middleware yang set req.user)
    const role = req.user?.role; // "qa" / "dev"
    if (!role) return res.status(401).json({ message: "Unauthorized" });

    // 3) cek defect aktif
    const activeDefect = await defectServices.getActiveDefectByTestSpecId(testSpecId);

    // 4) enforce policy
    if (activeDefect) {
      const status = activeDefect.status;

      // To Do / In Progress => DEV only
      if (["To Do", "In Progress"].includes(status) && role !== "dev") {
        return res.status(403).json({
          message: "Rerun tidak diizinkan: task sedang dikerjakan DEV.",
        });
      }

      // Done => QA only
      if (status === "Done" && role !== "qa") {
        return res.status(403).json({
          message: "Rerun tidak diizinkan: task Done sedang diverifikasi QA.",
        });
      }
    }

    // 5) baru trigger Jenkins
    const finalSpec = target;
    const { queueUrl } = await triggerRerunSpec(finalSpec);

    await saveLatestTestRun({ scope, target: finalSpec });

    return res.json({ message: "Rerun spec berhasil ditrigger", queueUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal trigger Jenkins" });
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

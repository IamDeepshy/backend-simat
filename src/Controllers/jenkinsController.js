const { triggerRerunSpec } = require("../services/jenkinsWithParam");

async function rerunSpec(req, res) {
  try {
    const { spec } = req.body;

    if (!spec) {
      return res.status(400).json({ message: "SPEC wajib diisi" });
    }

    await triggerRerunSpec(spec);

    res.json({
      message: "Rerun spec berhasil ditrigger",
      spec
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal trigger Jenkins" });
  }
}

module.exports = { rerunSpec };

const express = require("express");
const { rerunSpec } = require("../controllers/jenkinsController");
const { resolveQueueBuild } = require("../controllers/jenkinsController");
const { getBuildProgressController } = require("../controllers/jenkinsController");

const router = express.Router();

router.post("/jenkins/rerun/spec", rerunSpec);
router.get("/jenkins/queue/resolve", resolveQueueBuild);
router.get("/jenkins/build/:buildNumber/progress", getBuildProgressController);

module.exports = router;

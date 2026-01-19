const express = require("express");
const { rerunSpec } = require("../controllers/jenkinsController");
const { resolveQueueBuild } = require("../controllers/jenkinsController");
const { getBuildProgressController } = require("../controllers/jenkinsController");
const authMiddleware = require("../Middleware/auth"); 

const router = express.Router();

router.post("/jenkins/rerun/spec", authMiddleware, rerunSpec);
router.get("/jenkins/queue/resolve", authMiddleware, resolveQueueBuild);
router.get("/jenkins/build/:buildNumber/progress", authMiddleware, getBuildProgressController);

module.exports = router;

const express = require("express");
const { rerunSpec } = require("../controllers/jenkinsController");

const router = express.Router();

router.post("/jenkins/rerun/spec", rerunSpec);

module.exports = router;

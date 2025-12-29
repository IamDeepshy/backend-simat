const express = require("express");
const router = express.Router();

const { getGroupedTestCases } = require("../controllers/testcaseGroupController");

router.get("/grouped-testcases", getGroupedTestCases);

module.exports = router;

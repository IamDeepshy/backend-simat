const express = require("express");
const router = express.Router();

const { getGroupedTestCases } = require("../controllers/testcaseGroupController");
const authMiddleware = require("../Middleware/auth");

router.get("/grouped-testcases", authMiddleware, getGroupedTestCases);

module.exports = router;

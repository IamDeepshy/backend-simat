const { PrismaClient } = require("@prisma/client");
const { getParentTestCase } = require("../utils/groupTestcase");

const prisma = new PrismaClient();

const getGroupedTestCases = async (req, res) => {
  try {
    const tests = await prisma.test_specs.findMany({
      orderBy: { suiteName: "asc" }
    });

    const grouped = {};

    for (const test of tests) {
      const parent = getParentTestCase(test.suiteName);

      if (!grouped[parent]) {
        grouped[parent] = {
          parentCode: parent,
          totalTests: 0,
          passed: 0,
          failed: 0,
          broken: 0,
          testCases: []
        };
      }

      grouped[parent].testCases.push(test);
      grouped[parent].totalTests++;

      if (test.status === "PASSED") grouped[parent].passed++;
      if (test.status === "FAILED") grouped[parent].failed++;
      if (test.status === "BROKEN") grouped[parent].broken++;
    }

    // Sort child testCases biar urut 01,02,03
    Object.values(grouped).forEach(group =>
      group.testCases.sort((a, b) =>
        a.suiteName.localeCompare(b.suiteName)
      )
    );

    res.json(Object.values(grouped));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal grouping test case" });
  }
};

module.exports = { getGroupedTestCases };

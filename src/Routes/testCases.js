router.get("/testcases/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const testCase = await prisma.testCase.findUnique({
      where: { id: Number(id) },
    });

    if (!testCase) {
      return res.status(404).json({ message: "Test case not found" });
    }

    res.json(testCase);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

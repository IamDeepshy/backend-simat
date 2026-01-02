function getScreenshotFromTest(test) {
  // cek attachments utama
  if (test.attachments?.length) {
    const img = test.attachments.find(a => a.type?.includes("image"));
    if (img) return img.source;
  }

  // cek tiap step
  if (test.steps?.length) {
    for (const step of test.steps) {
      if (step.attachments?.length) {
        const img = step.attachments.find(a => a.type?.includes("image"));
        if (img) return img.source;
      }
    }
  }

  return null;
}

module.exports = { getScreenshotFromTest };

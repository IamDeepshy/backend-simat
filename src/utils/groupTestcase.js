// Mengambil kode parent testCase dari suiteName
function getParentTestCase(code = "") {
  if (!code) return "UNKNOWN";

  // Bersihkan spasi berlebih agar regex konsisten
  const clean = code.replace(/\s+/g, "");

  // Ambil pola parent test case: AT-CORE-XXXX
  const match = clean.match(/AT-CORE-\d{4}/);

  return match ? match[0] : "UNKNOWN";
}

module.exports = { getParentTestCase };

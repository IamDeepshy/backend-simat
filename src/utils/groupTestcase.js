function getParentTestCase(code = "") {
  if (!code) return "UNKNOWN";

  // Bersihkan spasi aneh
  const clean = code.replace(/\s+/g, "");

  // Ambil AT-CORE-XXXX
  const match = clean.match(/AT-CORE-\d{4}/);

  return match ? match[0] : "UNKNOWN";
}

module.exports = { getParentTestCase };

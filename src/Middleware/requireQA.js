module.exports = function (req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.user.role !== "qa") {
    return res.status(403).json({
      message: "Hanya role QA yang dapat membuat defect",
    });
  }

  next();
};

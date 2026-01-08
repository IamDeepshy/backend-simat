const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;


module.exports = function (req, res, next) {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ message: "Anda Belum login!" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // { berisi id, role, usn }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token tidak valid" });
  }
};

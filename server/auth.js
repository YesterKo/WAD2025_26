const jwt = require("jsonwebtoken");
const config = require("./config");
function verifyToken(req, res, next) {
  // NEVER COMMENT THIS OUT AGAIN

  try {
    const token = req.cookies.JWT;
    if (!token) return res.status(401).json({ error: "Access denied" });
    try {
      const decoded = jwt.verify(token, config.jwtSecret);
      if (!decoded) {
        return res.status(401).json({ error: "Invalid token" });
      }
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

function generateToken(user) {
  const payload = {
    UserId: user.id,
    Username: user.username,
  };
  return jwt.sign(payload, config.jwtSecret, { expiresIn: "1h" });
}

module.exports = { verifyToken, generateToken };

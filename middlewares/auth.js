const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const decoded = verifyToken(token);
    const user = await User.findOne({ where: { email: decoded.email } });
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    req.user = user;
    if (req.user.role !== "admin") {
      if (user.id !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
      }
    }
    next();
  } catch (err) {
    res.status(500).json(err);
  }
};

const authAdminMiddleware = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const decoded = verifyToken(token);
    const user = await User.findOne({ where: { email: decoded.email } });
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    req.user = user;
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { authMiddleware, authAdminMiddleware };

const router = require("express").Router();
const {
  register,
  login,
  updateUser,
  deleteUser,
  topup,
} = require("../controllers/UserController");
const { authMiddleware } = require("../middlewares/auth");

router.post("/register", register);
router.post("/login", login);
router.put("/", authMiddleware, updateUser);
router.delete("/", authMiddleware, deleteUser);
router.patch("/topup", authMiddleware, topup);

module.exports = router;

const router = require("express").Router();
const { authAdminMiddleware } = require("../middlewares/auth");
const {
  createCategory,
  getAllCategories,
  editCategory,
  deleteCategory,
} = require("../controllers/CategoryController");

router.post("/", authAdminMiddleware, createCategory);
router.get("/", authAdminMiddleware, getAllCategories);
router.patch("/:categoryId", authAdminMiddleware, editCategory);
router.delete("/:categoryId", authAdminMiddleware, deleteCategory);

module.exports = router;

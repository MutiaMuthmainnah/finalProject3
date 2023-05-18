//create a router for products
const router = require("express").Router();
const { authAdminMiddleware, authMiddleware } = require("../middlewares/auth");
const { createProduct,
        getAllProducts,
        getProductsbyId,
        editCategoryId,
        editProduct,
        deleteProduct
     } = require("../controllers/ProductController");

router.get("/", authMiddleware, getAllProducts);
router.post("/", authAdminMiddleware, createProduct);
router.put("/:productId", authAdminMiddleware, editProduct);
router.get("/:productId", authAdminMiddleware, getProductsbyId);
router.patch("/:productId", authAdminMiddleware, editCategoryId);
router.delete("/:productId", authAdminMiddleware, deleteProduct);

module.exports = router;

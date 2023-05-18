//create a router for transcations
const router = require("express").Router();
const { authMiddleware, authAdminMiddleware } = require("../middlewares/auth");
const { createTransaction, getAllTransaction, getAllTransactionAdmin, getTransactionbyId} = require("../controllers/TransactionController");

router.get("/user", authMiddleware, getAllTransaction);
router.post("/", authMiddleware, createTransaction);
router.get("/admin", authAdminMiddleware, getAllTransactionAdmin);
router.get("/:transactionId", authMiddleware, getTransactionbyId)

module.exports = router;


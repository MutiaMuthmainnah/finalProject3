const router = require("express").Router();
const userRouter = require("./userRouter");
const categoryRouter = require("./categoryRouter");
const productRouter = require("./productRouter");
const transactionRouter = require("./transactionRouter");

router.use("/users", userRouter);
router.use("/categories", categoryRouter);
router.use("/products", productRouter);
router.use("/transactions", transactionRouter);
module.exports = router;

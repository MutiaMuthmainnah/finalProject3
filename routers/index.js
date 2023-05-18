const router = require("express").Router();
const userRouter = require("./userRouter");
const categoryRouter = require("./categoryRouter");
const productRouter = require("./productRouter");

router.use("/users", userRouter);
router.use("/categories", categoryRouter);
router.use("/products", productRouter);
module.exports = router;

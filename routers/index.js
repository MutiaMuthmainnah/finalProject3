const router = require("express").Router();
const userRouter = require("./userRouter");
const categoryRouter = require("./categoryRouter");

router.use("/users", userRouter);
router.use("/categories", categoryRouter);

module.exports = router;

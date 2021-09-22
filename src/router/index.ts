import express from "express";

import userRouter from "./User";
import cardRouter from "./Card";
import categoryRouter from "./Category";
import questionRouter from "./Question";

const router = express.Router();

router.use(userRouter);
router.use("/card", cardRouter);
router.use("/category", categoryRouter);
router.use("/question", questionRouter);

export default router;

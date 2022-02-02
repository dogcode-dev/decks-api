import express from "express";
import SessionController from "../controllers/SessionController";

const userRouter = express.Router();

userRouter.post("/sign-in", SessionController.create);

export default userRouter;

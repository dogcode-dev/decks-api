import express from "express";
import UserController from "../controllers/UserController";

const userRouter = express.Router();

userRouter.get("/users", UserController.find);

userRouter.get("/user:id", UserController.findById);

userRouter.post("/user", UserController.create);

export default userRouter;

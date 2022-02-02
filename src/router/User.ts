import express from "express";
import UserController from "../controllers/UserController";

import AuthenticationAssurance from "../middlewares/AuthenticationAssurance";

const userRouter = express.Router();

userRouter.get("/users", AuthenticationAssurance, UserController.find);

userRouter.get("/user:id", AuthenticationAssurance, UserController.findById);

userRouter.post("/user", UserController.create);

export default userRouter;

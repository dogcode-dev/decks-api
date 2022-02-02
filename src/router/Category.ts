import express from "express";
import CategoryController from "../controllers/CategoryController";

const categoryRouter = express.Router();

categoryRouter.get("/categories", CategoryController.find);

categoryRouter.get("/category/:id", CategoryController.findById);

categoryRouter.post("/category", CategoryController.create);

categoryRouter.put("/category/:id", CategoryController.update);

categoryRouter.delete("/category/:id", CategoryController.delete);

export default categoryRouter;

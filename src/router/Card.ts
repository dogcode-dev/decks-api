import express from "express";
import CardController from "../controllers/CardController";

const cardRouter = express.Router();

cardRouter.get("/cards", CardController.find);

cardRouter.get("/card/:id", CardController.findById);

cardRouter.post("/card", CardController.create);

export default cardRouter;

import express from "express";
import CardController from "../controllers/CardController";
import AuthenticationAssurance from "../middlewares/AuthenticationAssurance";

const cardRouter = express.Router();

cardRouter.get("/cards", CardController.find);

cardRouter.get("/card/:id", CardController.findById);

cardRouter.post("/card", AuthenticationAssurance, CardController.create);

cardRouter.put("/card/:id", AuthenticationAssurance, CardController.update);

cardRouter.delete("/card/:id", AuthenticationAssurance, CardController.delete);

export default cardRouter;

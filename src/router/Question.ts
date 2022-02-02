import express from "express";
import QuestionController from "../controllers/QuestionController";

const questionRouter = express.Router();

questionRouter.get("/questions", QuestionController.find);

questionRouter.get("/question/:id", QuestionController.findById);

questionRouter.get("/card/:cardId/questions", QuestionController.findByCardId);

questionRouter.post("/question", QuestionController.create);

/*
questionRouter.put('/:id', (req, res) => {

    const { id, name } = req.body;

    QuestionController.update(id, name).then((question) => {
        res.json(question);
    }).catch((err) => {
        console.log(`Error: ${err}`);
        res.status(500).send({ message: `Error when update question from id: ${req.body.id}!` });
    });
});
*/

export default questionRouter;

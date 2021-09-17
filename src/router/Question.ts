import express from 'express';
import QuestionController from '../controllers/QuestionController';

const questionRouter = express.Router();

questionRouter.get('/', (req, res) => {
    QuestionController.find().then((questions) => {
        res.json(questions);
    }).catch((err) => {
        console.log(`Error: ${err}`);
        res.status(500).send({ message: 'Error when find all questions!' });
    });
});

questionRouter.get('/:id', (req, res) => {
    QuestionController.findById(req.body.id).then((question) => {
        res.json(question);
    }).catch((err) => {
        console.log(`Error: ${err}`);
        res.status(500).send({ message: `Error when find question from id: ${req.body.id}!` });
    });
});

questionRouter.post('/', (req, res) => {
    
    const card: string = req.body.card.id;
    const question: string = req.body.question;
    const answer: string = req.body.answer;
    const data = { card,  question, answer };

    QuestionController.create(data).then((quest) => {
        res.json(quest);
    }).catch((err) => {
        console.log(`Error: ${err}`);
        res.status(500).send({ message: 'Error when create a new question!' });
    });
});

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
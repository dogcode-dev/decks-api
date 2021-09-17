import express from 'express';
import CardController from '../controllers/CardController';

const cardRouter = express.Router();

cardRouter.get('/', (req, res) => {
    CardController.find().then((cards) => {
        res.json(cards);
    }).catch((err) => {
        console.log(`Error: ${err}`);
        res.status(500).send({ message: 'Error when find all cards!' });
    });
});

cardRouter.get('/:id', (req, res) => {
    CardController.findById(req.body.id).then((card) => {
        res.json(card);
    }).catch((err) => {
        console.log(`Error: ${err}`);
        res.status(500).send({ message: `Error when find card from id: ${req.body.id}!` });        
    })
});

cardRouter.post('/', (req, res) => {

    const name: string = req.body.name;
    const owner: string = req.body.owner.id;
    const category: string = req.body.category.id;
    const data = { name,  owner, category}

    CardController.create(data).then((card) => {
        res.json(card);
    }).catch((err) => {
        console.log(`Error: ${err}`);
        res.status(500).send({ message: 'Error when create a new card!' });
    });
});

export default cardRouter;
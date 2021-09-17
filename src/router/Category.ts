import express from 'express';
import CategoryController from '../controllers/CategoryController';

const categoryRouter = express.Router();

categoryRouter.get('/', (req, res) => {
    CategoryController.find().then((categories) => {
        res.json(categories);
    }).catch((err) => {
        console.log(`Error: ${err}`);
        res.status(500).send({ message: 'Error when find all categories!' });
    });
});

categoryRouter.get('/:id', (req, res) => {
    CategoryController.findById(req.body.id).then((category) => {
        res.json(category);
    }).catch((err) => {
        console.log(`Error: ${err}`);
        res.status(500).send({ message: `Error when find category from id: ${req.body.id}!` });
    });
});

categoryRouter.post('/', (req, res) => {

    const { name } = req.body;

    CategoryController.create(name).then((category) => {
        res.json(category);
    }).catch((err) => {
        console.log(`Error: ${err}`);
        res.status(500).send({ message: 'Error when create a new category!' });
    });
});

categoryRouter.put('/:id', (req, res) => {

    const { id, name } = req.body;

    CategoryController.update(id, name).then((category) => {
        res.json(category);
    }).catch((err) => {
        console.log(`Error: ${err}`);
        res.status(500).send({ message: `Error when update category from id: ${req.body.id}!` });
    });
});

export default categoryRouter;
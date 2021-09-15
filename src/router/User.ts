import express from 'express';
import UserController from '../controllers/UserController';

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    UserController.find().then((users) => {
        res.json(users);
    }).catch((err) => {
        console.log(`Error: ${err}`);
        res.status(500).send({ message: 'Error when find all users!' });
    });
});

userRouter.get('/:id', (req, res) => {
    UserController.findById(req.body.id).then((user) => {
        res.json(user);
    }).catch((err) => {
        console.log(`Error: ${err}`);
        res.status(500).send({ message: `Error when find user from id: ${req.body.id}!` });
    });
});

userRouter.post('/', (req, res) => {
    const { name, email, nick, password } = req.body;

    UserController.create( name, email, nick, password).then((user) => {
        res.json(user);
    }).catch((err) => {        
        console.log(`Error: ${err}`);
        res.status(500).send({ message: `Error when create a new user!` });
    });
});

export default userRouter;
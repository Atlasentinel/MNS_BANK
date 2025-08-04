import express from 'express';
import ClientController from './controller/ClientController';
import AccountController from './controller/AccountController';


const app = express();
app.use(express.json());

const clientController = new ClientController();
app.use('/', clientController.router);

const accountController = new AccountController();
app.use('/', accountController.router);

export default app;
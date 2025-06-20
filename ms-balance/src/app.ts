import express from 'express';
import ClientController from './controller/ClientController';

const app = express();
app.use(express.json());

const clientController = new ClientController();
app.use('/', clientController.router);

export default app;
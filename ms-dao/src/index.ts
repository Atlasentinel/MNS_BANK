import express from 'express';
import ClientController from './Controller/ClientController'; // adapte le chemin
import AccountController from './Controller/AccountController';

const app = express();
const PORT = 3200;

app.use(express.json());

const clientController = new ClientController();
app.use('/', clientController.router);

const accountController = new AccountController();
app.use('/', accountController.router);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
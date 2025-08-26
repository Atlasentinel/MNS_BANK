import express from 'express';
import TokenService from './domain/service/TokenService';
import AccountService from './domain/service/AccountService';
import { AccountRepositoryAdapter } from './adapter/out/AccountRepositoryAdapter';
import { AccountHttpAdapter } from './adapter/in/AccountHttpAdapter';
import { ClientRepositoryAdapter } from './adapter/out/ClientRepositoryAdapter';

const app = express();
app.use(express.json());

// const clientController = new ClientController();
// app.use('/', clientController.router);

// const accountController = new AccountController();
// app.use('/', accountController.router);


// Ici, on instancie et on injecte les dépendances
const accountRepository = new AccountRepositoryAdapter();
const clientRepository = new ClientRepositoryAdapter();

const accountService = new AccountService(accountRepository);
const tokenService = new TokenService(clientRepository);

const accountHttpAdapter = new AccountHttpAdapter(accountService, tokenService);

// Utilisation dans une route Express
app.get("/client/:id/balance/:token", (req, res) => accountHttpAdapter.handleCheckBalanceRequest(req, res));

export default app;
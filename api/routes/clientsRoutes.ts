import express from 'express';
import { Router } from 'express';
import { Clients } from '../controllers/ClientsController';

const router: Router = express.Router();

router.get('/clients', Clients.getAll);
router.get('/client/:id', Clients.getById);
router.get('/client/:id/account', Clients.getAccountByClientId);
router.post('/client', Clients.create);

export default router;

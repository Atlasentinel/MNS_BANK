import { Router } from 'express';
import { Client } from '../service/ClientService';

const router: Router = Router();

router.get('/clients', Client.getAll);
router.get('/client/:id', Client.getById);
router.get('/client/:id/account', Client.getAccountByClientId);
router.post('/client', Client.create);

export default router;

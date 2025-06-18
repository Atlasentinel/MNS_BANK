import express from 'express';
import { Router } from 'express';
import { Accounts } from '../controllers/AccountsController';

const router: Router = express.Router();

router.get('/accounts', Accounts.getAll);
router.get('/account/:id', Accounts.getById);
router.get('/account/:id/balance', Accounts.getBalanceByAccountId);
router.post('/account', Accounts.create);

module.exports = router;

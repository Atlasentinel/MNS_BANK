const express = require('express');
const router = express.Router();
const Clients = require('../controllers/ClientsController');

router.get('/clients', Clients.getAll);
router.get('/client/:id', Clients.getById);
router.get('/client/:id/balance', Clients.getBalanceByClientId);
router.post('/client', Clients.create);

module.exports = router;

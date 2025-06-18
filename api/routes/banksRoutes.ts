import { Router } from 'express';
import { Banks } from '../controllers/BanksController';

const router: Router = Router();

router.get('/banks', Banks.getAll);
router.get('/bank/:id', Banks.getById);
router.post('/bank', Banks.create);

export default router;

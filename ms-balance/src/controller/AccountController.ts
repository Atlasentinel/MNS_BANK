import { Router, Request, Response } from 'express';
import axios from 'axios';
import AccountService from '../service/AccountService';

export default class AccountController {
    public router: Router;
    private readonly accountService: AccountService;

    constructor() {
        this.router = Router();
        this.accountService = new AccountService();
        this.registerRoutes();
    }
    // Register routes for the client controller
    private registerRoutes(): void {
        this.getBalance = this.getBalance.bind(this);
        this.router.get('/client/:id/balance', this.getBalance);

    }

    private getBalance(req: Request, res: Response): void {
        try {
            const id = parseInt(req.params.id);
            const clients = this.accountService.getBalance(id);
            res.status(200).json(clients);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }

}

import { Router, Request, Response } from 'express';
import ClientService from '../service/ClientService';

export default class ClientController {
    public router: Router;
    private clientService: ClientService;

    constructor() {
        this.router = Router();
        this.clientService = new ClientService();
        this.registerRoutes();
    }

    private registerRoutes(): void {
        this.router.get('/client/:id/balance', this.getClientBalance.bind(this));
        this.router.get('/client/:id', this.getClientById.bind(this));
        this.router.get('/client/:id/account', this.getClientAccount.bind(this));
        this.router.get('/client-richest', this.getRichestClient.bind(this));
    }

    private getClientBalance(req: Request, res: Response): void {
        try {
            const id = parseInt(req.params.id);
            const balance = this.clientService.getAmmountByClient(id);
            res.status(200).json({ balance });
        } catch (err: any) {
            res.status(404).json({ error: err.message });
        }
    }

    private getClientById(req: Request, res: Response): void {
        try {
            const id = parseInt(req.params.id);
            const client = this.clientService.getClientById(id);
            res.status(200).json(client);
        } catch (err: any) {
            res.status(404).json({ error: err.message });
        }
    }

    private getClientAccount(req: Request, res: Response): void {
        try {
            const id = parseInt(req.params.id);
            const account = this.clientService.getAccountByClientId(id);
            res.status(200).json(account);
        } catch (err: any) {
            res.status(404).json({ error: err.message });
        }
    }

    private getRichestClient(req: Request, res: Response): void {
        try {
            const client = this.clientService.getRichestClient();
            res.status(200).json(client);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }
}

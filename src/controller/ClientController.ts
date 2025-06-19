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
}

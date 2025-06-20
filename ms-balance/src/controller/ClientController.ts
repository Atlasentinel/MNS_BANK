import { Router, Request, Response } from 'express';
import axios from 'axios';
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
        this.getAllClient = this.getAllClient.bind(this);
        this.router.get('/clients', this.getAllClient);
        this.router.get('/client/:id/balance/:token', this.getClientBalance.bind(this));
        this.router.get('/client/:id', this.getClientById.bind(this));
    }

    private getAllClient(req: Request, res: Response): void {
        try {
            const clients = this.clientService.getAllClients();
            res.status(200).json(clients);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }


    public async getClientBalance(req: Request, res: Response): Promise<void> {
        try {

        const body = {
            token : req.params.token,
        }

        const gatewayCheck = await axios.post('http://api-gateway:3100/auth/checktoken', body);

        if (!gatewayCheck.data || gatewayCheck.data !== true) {
            res.status(503).json({ error: 'Le client est pas connecté' });
            return;
        }

        const id = parseInt(req.params.id);
        const balance = this.clientService.getAmmountByClient(id);
        res.status(200).json({ balance });

        } catch (err: any) {
            res.status(404).json({ error: err.message || 'Erreur inconnue' });
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


}

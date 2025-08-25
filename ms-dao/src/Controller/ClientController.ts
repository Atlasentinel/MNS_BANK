import { Router, Request, Response } from 'express';
import axios from 'axios';
import  ClientDAO  from '../Dao/ClientDAO'
import IDAO from '../Dao/IDAO';
import { Client } from '../Model/Client';
import DAOFactory from '../Dao/Factory/DAOFactory';


export default class ClientController {
    public router: Router;
    private clientDAO: ClientDAO | undefined;

    constructor() {
        this.router = Router();
        this.clientDAO = DAOFactory.getDAOFactory()?.getClientDAO();
        this.registerRoutes();
    }

private registerRoutes(): void {
    this.getClientByLoginAndPassword = this.getClientByLoginAndPassword.bind(this);
    this.getAllClient = this.getAllClient.bind(this);
    this.getClientById = this.getClientById.bind(this);
    this.createClient = this.createClient.bind(this);
    this.deleteClient = this.deleteClient.bind(this);
    this.updateClient = this.updateClient.bind(this);

    this.router.post('/client/login', this.getClientByLoginAndPassword);
    this.router.get('/clients', this.getAllClient);
    this.router.get('/client/:id', this.getClientById);
    this.router.post('/client/create', this.createClient);
    this.router.get('/client/:id/delete', this.deleteClient);
    this.router.post('/client/update', this.updateClient);
}

private async getClientByLoginAndPassword(req: Request, res: Response): Promise<void> {
    try {
        const { login, password } = req.body;
        const client = await this.clientDAO?.findByLoginAndPassword(login, password);
        if (client) {
            res.status(200).json(client);
        } else {
            res.status(404).json({ error: 'Client not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur serveur");
    }
}

private async getAllClient(req: Request, res: Response): Promise<void> {
    try {
        const clients = await this.clientDAO?.findAll();
        res.json(clients);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur serveur");
    }
}


public async getClientById(req: Request, res: Response): Promise<void> {
    try {
        const client = await this.clientDAO?.findById(parseInt(req.params.id));
        res.json(client);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur serveur");
    }
}

public async createClient(req: Request, res: Response): Promise<void> {
    try {
        const result = await this.clientDAO?.create(req.body);
        res.status(201).send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur serveur");
    }
}

private async deleteClient(req: Request, res: Response): Promise<void> {
    try {
        const result = await this.clientDAO?.delete(parseInt(req.params.id));
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur serveur");
    }
}

private async updateClient(req: Request, res: Response): Promise<void> {
    try {
        const result = await this.clientDAO?.update(req.body);
        res.send(result ? "Client mis à jour" : "Client non mis à jour");
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur serveur");
    }
}

}
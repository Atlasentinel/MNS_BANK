import { Router, Request, Response } from 'express';
import { Account } from '../Model/Account';
import DAOFactory from '../Dao/Factory/DAOFactory';
import AccountDAO from '../Dao/AccountDAO';


export default class AccountController {
    public router: Router;
    private accountDAO: AccountDAO | undefined;

    constructor() {
        this.router = Router();
        this.accountDAO = DAOFactory.getDAOFactory()?.getAccountDAO();
        this.registerRoutes();
    }

    private registerRoutes(): void {
        this.getAccountByClientId = this.getAccountByClientId.bind(this);
        this.router.get('/client/:id/account', this.getAccountByClientId.bind(this));
    }

    private async getAccountByClientId(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const account = await this.accountDAO?.findById(id);
            res.json(account);
        } catch (err) {
            console.error(err);
            res.status(500).send("Erreur serveur");
        }
    }
}
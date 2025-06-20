import { ConnexionSQL } from '../../ConnexionSQL/Connexion';
import { Account } from '../../Model/Account';
import AccountDAO from '../AccountDAO';

export class SQLAccountDAO implements AccountDAO {

    public async create(item: Account): Promise<String> {
        // TODO: implement create        
        let connexion = ConnexionSQL.getInstance();
        let query = `INSERT INTO accounts (client_id, balance) VALUES (${item.clientId}, ${item.balance})`;
        return "Client created successfully";
    }
    public async update(cli: Account): Promise<boolean> {
        // TODO: implement update
        let connexion = ConnexionSQL.getInstance();
        let query = `UPDATE accounts SET client_id = ${cli.clientId}, balance = ${cli.balance} WHERE id = ${cli.id}`;
        return true;
    }
    public async delete(id: number): Promise<String> {
        // TODO: implement delete
        let connexion = ConnexionSQL.getInstance();
        let query = `DELETE FROM accounts WHERE id = ${id}`;

        return "Client deleted successfully";
    }
    public async findAll(): Promise<Account[]> {
        // TODO: implement findAll
        let connexion = ConnexionSQL.getInstance();
        let query = `SELECT * FROM accounts`;
        // This should be replaced with actual database fetching logic
        return [];
    }

    public async findById(id: number): Promise<Account> {
        // TODO: implement findById
        let connexion = ConnexionSQL.getInstance();
        let query = `SELECT * FROM accounts WHERE id = ${id}`;
        return new Account(1, 1, 1000.00);
    }


}
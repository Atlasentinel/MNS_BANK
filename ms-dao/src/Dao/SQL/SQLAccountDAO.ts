import { ConnexionSQL } from '../../ConnexionSQL/Connexion';
import { Account } from '../../Model/Account';
import AccountDAO from '../AccountDAO';

export class SQLAccountDAO implements AccountDAO {

    public async create(item: Account): Promise<String> {
        // TODO: implement create        
        return "Client created successfully";
    }
    public async update(cli: Account): Promise<boolean> {
        // TODO: implement update
        return true;
    }
    public async delete(id: number): Promise<String> {
        // TODO: implement delete
        return "Client deleted successfully";
    }
    public async findAll(): Promise<Account[]> {
        // TODO: implement findAll
        return [];
    }

    public async findById(id: number): Promise<Account> {
        const db = ConnexionSQL.getInstance();
        const connexion = await db.getConnection();
        try {
            const result = await connexion.query(`SELECT * FROM accounts WHERE client_id = ${id}`);
            if (result.rows.length === 0) {
                throw new Error("Account not found");
            }
            const row = result.rows[0];
            return new Account(row.id, row.client_id, row.balance);
        } catch (error) {
            throw error;
        } finally {
            connexion.release(); // c'est indispensable pour que mockRelease soit appelé
        }
    }
}
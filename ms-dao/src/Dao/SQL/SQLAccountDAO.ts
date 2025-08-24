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
        // Récupérer un compte associé à un client
        let connexion = ConnexionSQL.getInstance();
        let query = `SELECT * FROM accounts WHERE client_id = ${id}`;
        return new Promise((resolve, reject) => {
            connexion.getConnection().then(client => {
                client.query(query).then(result => {
                    if (result.rows.length > 0) {
                        const row = result.rows[0];
                        resolve(new Account(row.id, row.client_id, row.balance));
                    } else {
                        reject(new Error("Account not found"));
                    }
                }).catch(err => {
                    reject(err);
                }).finally(() => {
                    client.release();
                });
            }).catch(err => {
                reject(err);
            });
        });
    }
}
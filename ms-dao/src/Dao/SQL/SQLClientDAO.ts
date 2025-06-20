import { Client } from '../../Model/Client';
import ClientDAO from '../ClientDAO';
import { ConnexionSQL } from '../../ConnexionSQL/Connexion';

export class SQLClientDAO implements ClientDAO {
    public async create(cli: Client): Promise<String> {

        let db = ConnexionSQL.getInstance();
        let connexion = await db.getConnection();

        let query = `INSERT INTO clients (id, name, login, password, token) VALUES ('${cli.id}', '${cli.name}', '${cli.login}' , '${cli.password}' , '${cli.token}'  )`;

        try {
            await connexion.query(query);
            return "Client created successfully";
        } catch (error) {
            console.error("Error creating client:", error);
            throw new Error("Database operation failed");
        } finally {
            connexion.release(); 
        }

    }

    public async update(cli: Client): Promise<boolean> {
        // TODO: implement update
        return true;
    }
    public async delete(id: number): Promise<String> {
        // TODO: implement delete
        return "Client deleted successfully";
    }
    public async findAll(): Promise<Client[]> {
        let db = ConnexionSQL.getInstance();
        let connexion = await db.getConnection();
        let query = `SELECT * FROM clients`;
        console.log("Executing query:", query);
        try {
            console.log("Connecting to the database...");
            let result = await connexion.query(query);
            console.log("Query executed successfully, processing results...");
            let clients: Client[] = result.rows.map(row =>
                new Client(row.id, row.name, row.login, row.password, row.token)
            );
            console.log("Clients retrieved:", clients);
            return clients;
            
        } catch (error) {
            console.error("Error creating client:", error);
            throw new Error("Database operation failed");
        } finally {
            connexion.release(); 
        }
    }

    public async findById(id: number): Promise<Client> {
        // TODO: implement findById
        let db = ConnexionSQL.getInstance();
        let connexion = await db.getConnection();
        let query = `SELECT * FROM clients WHERE id = ${id}`;

        try {
            let result = await connexion.query(query);
            let clients: Client[] = result.rows.map(row =>
                new Client(row.id, row.name, row.login, row.password, row.token)
            );
            return clients[0];

        } catch (error) {
            console.error("Error creating client:", error);
            throw new Error("Database operation failed");
        } finally {
            connexion.release(); 
        }
    }


}
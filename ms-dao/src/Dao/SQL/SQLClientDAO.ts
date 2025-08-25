import { Client } from '../../Model/Client';
import ClientDAO from '../ClientDAO';
import { ConnexionSQL } from '../../ConnexionSQL/Connexion';

export class SQLClientDAO implements ClientDAO {
    
    async findByLoginAndPassword(login: string, password: string): Promise<Client | null> {
        let db = ConnexionSQL.getInstance();
        let connexion = await db.getConnection();

        let query = `SELECT * FROM clients WHERE login = '${login}' AND password = '${password}'`;

        try {
            let result = await connexion.query(query);
            let clients: Client[] = result.rows.map(row =>
                new Client(row.id, row.name, row.login, row.password, row.token)
            );
            return clients[0] || null;

        } catch (error) {
            console.error("Error finding client:", error);
            throw new Error("Database operation failed");
        } finally {
            connexion.release();
        }
    }

    public async create(cli: Client): Promise<String> {

        let db = ConnexionSQL.getInstance();
        let connexion = await db.getConnection();

        let query = `INSERT INTO clients (name, login, password, token) VALUES ('${cli.name}', '${cli.login}' , '${cli.password}' , '${cli.token}'  )`;

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
        let db = ConnexionSQL.getInstance();
        let connexion = await db.getConnection();
        let query = `UPDATE clients SET name = '${cli.name}', login = '${cli.login}', password = '${cli.password}', token = '${cli.token}' WHERE id = ${cli.id}`;
        try {
            await connexion.query(query);
            return true;
        } catch (error) {
            console.error("Error updating client:", error);
            throw new Error("Database operation failed");
        } finally {
            connexion.release(); 
        }
    }
    
    public async delete(id: number): Promise<String> {
        return "todo";
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
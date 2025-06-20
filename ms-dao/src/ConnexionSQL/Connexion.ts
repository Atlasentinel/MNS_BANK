import { Pool, PoolClient } from 'pg';
import * as dotenv from 'dotenv';
import path from 'path';

export class ConnexionSQL {
    private static instance: ConnexionSQL;
    private pool: Pool;

    private constructor() {
        dotenv.config({ path: path.resolve(__dirname, '../.env.db') });
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: Number(process.env.DB_PORT),
        });
    }

    public static getInstance(): ConnexionSQL {
        if (!ConnexionSQL.instance) {
            ConnexionSQL.instance = new ConnexionSQL();
        }
        return ConnexionSQL.instance;
    }

    public async getConnection(): Promise<PoolClient> {
        try {
            return await this.pool.connect();
        } catch (err) {
            console.error('Erreur lors de la connexion à la base de données :', err);
            throw err;
        }
    }

    public async closeConnection(): Promise<void> {
        await this.pool.end();
        console.log('Connexion PostgreSQL fermée.');
    }
}

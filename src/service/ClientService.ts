import fs from 'fs';
import path from 'path';

const dbPath = path.join(__dirname, '../../bdd/db.json');

export default class ClientService {
    private data: any;

    constructor() {
        const rawData = fs.readFileSync(dbPath, 'utf-8');
        this.data = JSON.parse(rawData);
    }

    public getAmmountByClient(id: number): number {
        const client = this.getClientById(id);
        if (client && client.Account && typeof client.Account.balance === 'number') {
            return client.Account.balance;
        }
        throw new Error("Client or account not found");
    }

    public getClientById(id: number): any {
        const client = this.data.clients.find((c: any) => c.id === id);
        if (!client) {
            throw new Error("Client not found");
        }
        return client;
    }
}

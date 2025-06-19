import fs from 'fs';
import path from 'path';

const dbPath = path.join(__dirname, '../../bdd/db.json');

export default class ClientService {
    private data: any;

    constructor() {
        const rawData = fs.readFileSync(dbPath, 'utf-8');
        this.data = JSON.parse(rawData);
    }

    public getAllClients(): any[] {
        if (!this.data.clients || this.data.clients.length === 0) {
            throw new Error("No clients available");
        }
        return this.data.clients;
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

    public getAccountByClientId(id: number): any {
        const client = this.getClientById(id);
        if (!client.Account) {
            throw new Error("Account not found");
        }
        return client.Account;
    }

    public getRichestClient(): any {
        if (!this.data.clients || this.data.clients.length === 0) {
            throw new Error("No clients available");
        }

        let richest = this.data.clients[0];

        for (const client of this.data.clients) {
            if (
                client.Account &&
                richest.Account &&
                client.Account.balance > richest.Account.balance
            ) {
                richest = client;
            }
        }

        return richest;
    }
}

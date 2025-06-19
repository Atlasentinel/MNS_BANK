import { Client } from "./Client";

export abstract class Account {
    protected client: Client;
    protected balance: number = 15000000;
    protected numberAccount: string;

    constructor(client: Client) {
        this.client = client;
        // Tu peux aussi générer un numéro de compte ici si nécessaire
        this.numberAccount = this.generateAccountNumber();
    }

    public getClient(): Client {
        return this.client;
    }

    public getBalance(): number {
        return this.balance;
    }

    public setClient(client: Client): void {
        this.client = client;
    }

    public setBalance(balance: number): void {
        this.balance = balance;
    }

    private generateAccountNumber(): string {
        // Exemple de génération simple
        return 'ACC-' + Math.floor(100000 + Math.random() * 900000).toString();
    }
}

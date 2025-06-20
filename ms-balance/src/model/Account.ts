
export abstract class Account {
    protected balance: number = 15000000;
    protected numberAccount: string;

    constructor() {
        this.numberAccount = this.generateAccountNumber();
    }


    public getBalance(): number {
        return this.balance;
    }


    public setBalance(balance: number): void {
        this.balance = balance;
    }

    private generateAccountNumber(): string {
        // Exemple de génération simple
        return 'ACC-' + Math.floor(100000 + Math.random() * 900000).toString();
    }
}

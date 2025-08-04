
export abstract class Account {
    protected balance: number;
    protected id: number;
    protected clientId: number;

    constructor(id: number, clientId: number, balance: number) {
        this.id = id;
        this.clientId = clientId;
        this.balance = balance;
    }

    public getId(): number {
        return this.id;
    }
    public getClientId(): number {
        return this.clientId;
    }
    public setClientId(clientId: number): void {
        this.clientId = clientId;
    }
    public getBalance(): number {
        return this.balance;
    }
    public setBalance(balance: number): void {
        this.balance = balance;
    }

}

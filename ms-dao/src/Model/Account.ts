export class Account{
    id: number;
    clientId: number;
    balance: number;

    constructor(id: number, clientId: number, balance: number) {
        this.id = id;
        this.clientId = clientId;
        this.balance = balance;
    }
}
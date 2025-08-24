
export abstract class Account {
    balance: number;
    id: number;
    clientId: number;

    constructor(id: number, clientId: number, balance: number) {
        this.id = id;
        this.clientId = clientId;
        this.balance = balance;
    }

}

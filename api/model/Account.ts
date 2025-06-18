import { Client } from "./Client";


export abstract class Account {
    protected client : Client;
    protected balance : number = 15000000;
    protected numberAccount : String

    public getClient() : Client {
        return this.client
    }

    public Account(client : Client) : void {
        this.setClient(client);
    }

    public getBalance() : number {
        return this.balance;
    }

    public setClient(client : Client) : void{
        this.client = client;
    }

    public setBalance(balance : number) : void {
        this.balance = balance;
    }



}
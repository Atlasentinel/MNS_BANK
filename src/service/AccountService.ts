import { Account } from "../model/Account";
import { AccountWithoutOverdraft } from "../model/AccountWithoutOverdraft";
import { Client } from "../model/Client";

export abstract class AccountService {

    protected account: Account;

    constructor(client: Client) {
        this.account = new AccountWithoutOverdraft(client);
    }

    public debit(montant: number): string {
        this.account.setBalance(this.account.getBalance() - montant);
        return "Montant de " + montant + " débité";
    }

    public credit(montant: number): void {
        this.account.setBalance(this.account.getBalance() + montant);
    }
}

import { Account } from "../model/Account";
import { AccountWithoutOverdraft } from "../model/AccountWithoutOverdraft";

export abstract class AccountService {

    protected account: Account;

    constructor() {
        this.account = new AccountWithoutOverdraft();
    }

    public debit(montant: number): string {
        this.account.setBalance(this.account.getBalance() - montant);
        return "Montant de " + montant + " débité";
    }

    public credit(montant: number): void {
        this.account.setBalance(this.account.getBalance() + montant);
    }
}

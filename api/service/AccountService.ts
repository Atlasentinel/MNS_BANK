import { Account } from "../model/Account";
import { AccountWithoutOverdraft } from "../model/AccountWithoutOverdraft";

export abstract class AccountService {

    private account:Account;

    public AccountService() {
        this.account = new AccountWithoutOverdraft();
    }

    public debit(montant:number):String {
        this.account.setBalance(this.account.getBalance() - montant);
        return "Montant de" + montant + "débiter";
    }

    public credit(montant: number):void {
        this.account.setBalance(this.account.getBalance() + montant);
    }

}
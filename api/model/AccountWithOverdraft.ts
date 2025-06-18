import { Account } from "./Account";

export class AccountWithOverdraft extends Account {

    public autoriseOverdraft:number = 500;

    public override debit(amount: number): String {
        if((this.balance <amount + this.autoriseOverdraft)){
            this.balance = this.balance - amount;
            return "Montant de" + amount + "débiter";
        } else {
            return "Montant non débiter trop faible pour débiter"
        }
    }

}



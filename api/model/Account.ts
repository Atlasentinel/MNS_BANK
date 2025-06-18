export abstract class Account {

    protected balance : number = 15000000;
    protected numeroCompte : String

    public debit(montant:number):String {
        this.balance = this.balance - montant;
        return "Montant de" + montant + "débiter";
    }

    public credit(montant: number):void {
        this.balance = this.balance + montant;
    }

    public getBalance() : String {
        return "Le montant de votre compte est de :" + this.balance;
    }

}
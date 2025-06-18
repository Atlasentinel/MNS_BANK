export abstract class Account {

    protected balance : number = 15000000;
    protected numeroCompte : string

    public debit(montant:number):string {
        this.balance = this.balance - montant;
        return "Montant de" + montant + "débiter";
    }

    public credit(montant: number):void {
        this.balance = this.balance + montant;
    }

    public getBalance() : string {
        return "Le montant de votre compte est de :" + this.balance;
    }

}
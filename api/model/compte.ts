export abstract class Compte {

    protected sold : number = 15000000;
    protected numeroCompte : String

    public debiter(montant:number):String {
        this.sold = this.sold - montant;
        return "Montant de" + montant + "débiter";
    }

    public crediter(montant: number):void {
        this.sold = this.sold + montant;
    }

    public getSold() : String {
        return "Le montant de votre compte est de :" + this.sold;
    }

}
import { Compte } from "./compte.ts";

export class CompteAvecDecouvert extends Compte {

    public decouvertAutoriser:number = 500;

    public override debiter(montant: number): String {
        if((this.sold<montant)){
            this.sold = this.sold - montant;
            return "Montant de" + montant + "débiter";
        } else {
            return "Montant non débiter trop faible pour débiter"
        }
        
    }

}



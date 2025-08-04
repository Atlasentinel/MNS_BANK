import axios from "axios";
import { Account } from "../model/Account";
import { AccountWithoutOverdraft } from "../model/AccountWithoutOverdraft";

export default class AccountService {


     public async getAccount(): Promise<Account> {
        const response = await axios.get<{ account: Account[] }>('http://ms-dao:3200/clients');
        if (!response.data.account || response.data.account.length === 0) {
            throw new Error("No account available");
        }
        return response.data.account[0];
    }   

    public async getBalance(id: Number): Promise<number> {
        // Appel à l'API du microservice ms-dao pour récupérer le compte par client ID
        
        const response = await axios.get<{ balance: string }>(`http://ms-dao:3200/client/${id}/account`);
        
        // Récupérer le compte et retourner le solde
        // if (!response.data.balance) {
        //     throw new Error(`Account with id ${id} not found`);
        // }
        
        return parseFloat(response.data.balance);
    }
        
}

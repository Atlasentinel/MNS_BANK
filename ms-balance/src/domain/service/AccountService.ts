import axios from "axios";

import { CheckBalanceUseCase } from "../../port/in/CheckBalanceUseCase";
import { AccountRepositoryPort } from "../../port/out/AccountRepositoryPort";
import { AccountNotFoundException } from "../exception/AccountNotFoundException";


export default class AccountService implements CheckBalanceUseCase {
    
    constructor(private accountRepo: AccountRepositoryPort) {}

    // public async getAccount(): Promise<Account> {
    //     const response = await axios.get<{ account: Account[] }>('http://ms-dao:3200/clients');
    //     if (!response.data.account || response.data.account.length === 0) {
    //         throw new Error("No account available");
    //     }
    //     return response.data.account[0];
    // }   

    public async getBalance(clientId: number): Promise<number> {
        try {
            const balance = await this.accountRepo.getBalance(clientId);
            return balance;
        } catch {
            throw new AccountNotFoundException(`Balance not found for client id ${clientId}`);
        }
    }

    // public async getBalance(id: number): Promise<number> {
    //     const response = await axios.get<{ balance: string }>(`http://ms-dao:3200/client/${id}/account`);
    //     if (!response.data || !response.data.balance) {
    //         throw new Error("No balance available");
    //     }
    //     return parseFloat(response.data.balance);
    // }

        
}

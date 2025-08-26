import axios from "axios";
import { AccountRepositoryPort } from "../../port/out/AccountRepositoryPort";
import { Account } from "../../domain/model/Account";
import { AccountNotFoundException } from "../../domain/exception/AccountNotFoundException";

export class AccountRepositoryAdapter implements AccountRepositoryPort {

    public async getBalance(clientId: number): Promise<number> {
        const response = await axios.get<{ balance: string }>(`http://ms-dao:3200/client/${clientId}/account`);
        if (!response.data || !response.data.balance) {
            throw new AccountNotFoundException("No balance available");
        }
        return parseFloat(response.data.balance);
    }
}

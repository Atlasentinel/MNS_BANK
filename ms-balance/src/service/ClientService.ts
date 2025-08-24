
import axios from 'axios';
import { Account } from '../model/Account';
import { Client } from '../model/Client';


export default class ClientService {

    public async getAllClients(): Promise<Client[]> {
        const response = await axios.get<{ clients: Client[] }>('http://ms-dao:3200/clients');
        if (!response.data.clients || response.data.clients.length === 0) {
            throw new Error("No clients available");
        }
        return response.data.clients;
    }

    public async getClientById(id: number): Promise<Client> {
        const response = await axios.get<{ client: Client }>(`http://ms-dao:3200/client/${id}`);
        if (!response.data.client) {
            throw new Error(`Client with id ${id} not found`);
        }
        return response.data.client;
    }

    public async getClientAccountById(id: number): Promise<any> {
        const account = await axios.get<{ account: Account }>(`http://ms-dao:3200/client/${id}/account`);
        if (!account) {
            throw new Error(`Account for account with id ${id} not found`);
        }
        return account;
    }
}

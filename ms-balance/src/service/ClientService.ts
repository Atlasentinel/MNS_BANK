import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { promises } from 'dns';
import { Client } from '../model/Client';


export default class ClientService {

    public async getAllClients(): Promise<Client[]> {
        const response = await axios.get<{ clients: Client[] }>('http://ms-dao:3200/clients');
        if (!response.data.clients || response.data.clients.length === 0) {
            throw new Error("No clients available");
        }
        return response.data.clients;
    }

    public async getAmmountByClient(id: number): Promise<number> {
        const client = await this.getClientById(id);
        if (client && client.account && typeof client.account.getBalance() === 'number') {
            return client.account.getBalance();
        }
        throw new Error("Account not found or balance is not a number");
    }

    public async getClientById(id: number): Promise<Client> {
        const response = await axios.get<{ client: Client }>(`http://ms-dao:3200/client/${id}`);
        if (!response.data.client) {
            throw new Error(`Client with id ${id} not found`);
        }
        return response.data.client;
    }

    public async getClientAccountById(id: number): Promise<any> {
        const client:Client = await this.getClientById(id);
        if (!client.account) {
            throw new Error(`Account for client with id ${id} not found`);
        }
        return client.account;
    }
}

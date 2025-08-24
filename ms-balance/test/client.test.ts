import ClientService from '../src/service/ClientService';
import { Client } from '../src/model/Client';

jest.mock('axios');
import axios from 'axios';

describe('ClientService', () => {
  let service: ClientService;

  beforeEach(() => {
    service = new ClientService();
    jest.clearAllMocks();
  });

  describe('getAllClients', () => {
    it('should return a list of clients when response is valid', async () => {
      const fakeClients: Client[] = [
        new Client(1, 'Alice', 'alice', 'pass'),
        new Client(2, 'Bob', 'bob', 'pass2')
      ];
      (axios.get as jest.Mock).mockResolvedValue({
        data: { clients: fakeClients }
      });

      const clients = await service.getAllClients();
      expect(clients).toEqual(fakeClients);
      expect(axios.get).toHaveBeenCalledWith('http://ms-dao:3200/clients');
    });

    it('should throw an error if response has no clients', async () => {
      (axios.get as jest.Mock).mockResolvedValue({ data: { clients: [] } });

      await expect(service.getAllClients()).rejects.toThrow("No clients available");
    });
  });

  describe('getClientById', () => {
    it('should return a client when found', async () => {
      const fakeClient = new Client(1, 'Alice', 'alice', 'pass');
      (axios.get as jest.Mock).mockResolvedValue({
        data: { client: fakeClient }
      });

      const client = await service.getClientById(1);
      expect(client).toEqual(fakeClient);
      expect(axios.get).toHaveBeenCalledWith('http://ms-dao:3200/client/1');
    });

    it('should throw an error if client not found', async () => {
      (axios.get as jest.Mock).mockResolvedValue({ data: {} });

      await expect(service.getClientById(1)).rejects.toThrow("Client with id 1 not found");
    });
  });

  describe('getClientAccountById', () => {
    it('should return the account when found', async () => {
      const fakeAccount = { id: 1, clientId: 1, balance: 100 };
      (axios.get as jest.Mock).mockResolvedValue({
        data: { account: fakeAccount }
      });

      const account = await service.getClientAccountById(1);
      expect(account.data.account).toEqual(fakeAccount);
      expect(axios.get).toHaveBeenCalledWith('http://ms-dao:3200/client/1/account');
    });

    it('should throw an error if account not found', async () => {
      (axios.get as jest.Mock).mockResolvedValue(undefined);

      await expect(service.getClientAccountById(1)).rejects.toThrow("Account for account with id 1 not found");
    });
  });
});
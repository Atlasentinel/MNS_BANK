import AccountService from '../src/service/AccountService';

jest.mock('axios');
import axios from 'axios';

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(() => {
    service = new AccountService();
    jest.clearAllMocks();
  });

  describe('getBalance', () => {
    it('should return the balance as a number when response is valid', async () => {
      (axios.get as jest.Mock).mockResolvedValue({
        data: { balance: "1234.56" }
      });

      const balance = await service.getBalance(1);
      expect(balance).toBe(1234.56);
      expect(axios.get).toHaveBeenCalledWith('http://ms-dao:3200/client/1/account');
    });

    it('should throw an error if response has no data', async () => {
      (axios.get as jest.Mock).mockResolvedValue({});

      await expect(service.getBalance(1)).rejects.toThrow("No balance available");
    });

    it('should throw an error if response.data has no balance', async () => {
      (axios.get as jest.Mock).mockResolvedValue({ data: {} });

      await expect(service.getBalance(1)).rejects.toThrow("No balance available");
    });
  });
});
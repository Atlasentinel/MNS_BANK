import AccountService from '../src/domain/service/AccountService';
import { AccountRepositoryPort } from '../src/port/out/AccountRepositoryPort';
import { Account } from '../src/domain/model/Account';

describe('AccountService', () => {
  let service: AccountService;
  let accountRepo: jest.Mocked<AccountRepositoryPort>;

  beforeEach(() => {
    accountRepo = {
      getBalance: jest.fn(),
      // getAccountByClientId is intentionally omitted/commented
    } as unknown as jest.Mocked<AccountRepositoryPort>;
    service = new AccountService(accountRepo);
    jest.clearAllMocks();
  });

  describe('getBalance', () => {
    it('should return the balance as a number when repository returns a value', async () => {
      accountRepo.getBalance.mockResolvedValue(1234.56);

      const balance = await service.getBalance(1);
      expect(balance).toBe(1234.56);
      expect(accountRepo.getBalance).toHaveBeenCalledWith(1);
    });
    it('should throw an error if repository throws', async () => {
      accountRepo.getBalance.mockRejectedValue(new Error("DB error"));

      await expect(service.getBalance(1)).rejects.toThrow("Balance not found for client id 1");
    });
  });
});
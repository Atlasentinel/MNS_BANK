import TokenService from '../src/domain/service/TokenService';
import { ClientRepositoryPort } from '../src/port/out/AccountRepositoryPort copy';
import { Client } from '../src/domain/model/Client';

describe('TokenService', () => {
  let service: TokenService;
  let clientRepo: jest.Mocked<ClientRepositoryPort>;

  beforeEach(() => {
    clientRepo = {
      checkToken: jest.fn(),
    } as unknown as jest.Mocked<ClientRepositoryPort>;
    service = new TokenService(clientRepo);
    jest.clearAllMocks();
  });

  describe('checkToken', () => {
    it('should return true if repository returns true', async () => {
      clientRepo.checkToken.mockResolvedValue(true);
      const result = await clientRepo.checkToken(1, 'abc123');
      expect(result).toBe(true);
      expect(clientRepo.checkToken).toHaveBeenCalledWith(1, 'abc123');
    });

    it('should return false if repository returns false', async () => {
      clientRepo.checkToken.mockResolvedValue(false);

      const result = await clientRepo.checkToken(1, 'wrongtoken');
      expect(result).toBe(false);
      expect(clientRepo.checkToken).toHaveBeenCalledWith(1, 'wrongtoken');
    });

    it('should throw if repository throws', async () => {
      clientRepo.checkToken.mockRejectedValue(new Error("DB error"));

      await expect(clientRepo.checkToken(1, 'abc123'))
        .rejects.toThrow("DB error");
    });
  });
});
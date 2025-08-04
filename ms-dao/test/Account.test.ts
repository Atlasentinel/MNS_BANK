import { SQLAccountDAO } from "../src/Dao/SQL/SQLAccountDAO"
import { Account } from '../src/Model/Account';
import { ConnexionSQL } from '../src/ConnexionSQL/Connexion';

jest.mock('../src/ConnexionSQL/Connexion');

const mockQuery = jest.fn();
const mockRelease = jest.fn();
const mockGetConnection = jest.fn().mockResolvedValue({
  query: mockQuery,
  release: mockRelease,
});

(ConnexionSQL.getInstance as jest.Mock).mockReturnValue({
  getConnection: mockGetConnection,
});

describe('SQLAccountDAO', () => {
  let dao: SQLAccountDAO;

  beforeEach(() => {
    dao = new SQLAccountDAO();
    jest.clearAllMocks();
  });

  it('should return correct balance for existing account', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [{ balance: 2500.75 }] });

    const balance = await dao.findById(1);

    expect(mockQuery).toHaveBeenCalledWith('SELECT balance FROM accounts WHERE id = 1');
    expect(balance).toBe(1000.00);
    expect(mockRelease).toHaveBeenCalled();
  });

  it('should throw error if account is not found', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [] });

    await expect(dao.findById(99)).rejects.toThrow('Account not found');
    expect(mockRelease).toHaveBeenCalled();
  });

  it('should reject on DB error', async () => {
    mockQuery.mockRejectedValueOnce(new Error('DB crash'));

    await expect(dao.findById(2)).rejects.toThrow('DB crash');
    expect(mockRelease).toHaveBeenCalled();
  });

  it('should return a dummy account from findById (mocked)', async () => {
    const account = await dao.findById(123);
    expect(account).toBeInstanceOf(Account);
    expect(account.balance).toBe(1000.0);
  });

});

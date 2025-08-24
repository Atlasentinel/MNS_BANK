import { SQLAccountDAO } from "../src/Dao/SQL/SQLAccountDAO";
import { Account } from "../src/Model/Account";
import { ConnexionSQL } from "../src/ConnexionSQL/Connexion";

jest.mock("../src/ConnexionSQL/Connexion");

const mockQuery = jest.fn();
const mockRelease = jest.fn();
const mockGetConnection = jest.fn().mockResolvedValue({
  query: mockQuery,
  release: mockRelease,
});

(ConnexionSQL.getInstance as jest.Mock).mockReturnValue({
  getConnection: mockGetConnection,
});

describe("SQLAccountDAO", () => {
  let dao: SQLAccountDAO;

  beforeEach(() => {
    dao = new SQLAccountDAO();
    jest.clearAllMocks();
  });

  it("should return Account instance for existing client_id", async () => {
    const fakeRow = { id: 10, client_id: 5, balance: 1234.56 };
    mockQuery.mockResolvedValueOnce({ rows: [fakeRow] });

    const account = await dao.findById(5);

    expect(mockGetConnection).toHaveBeenCalled();
    expect(mockQuery).toHaveBeenCalledWith("SELECT * FROM accounts WHERE client_id = 5");
    expect(account).toBeInstanceOf(Account);
    expect(account.id).toBe(10);
    expect(account.clientId).toBe(5);
    expect(account.balance).toBe(1234.56);
    expect(mockRelease).toHaveBeenCalled();
  });

  it("should throw error if account not found", async () => {
    mockQuery.mockResolvedValueOnce({ rows: [] });

    await expect(dao.findById(99)).rejects.toThrow("Account not found");
    expect(mockRelease).toHaveBeenCalled();
  });

  it("should reject on DB error", async () => {
    mockQuery.mockRejectedValueOnce(new Error("DB crash"));

    await expect(dao.findById(2)).rejects.toThrow("DB crash");
    expect(mockRelease).toHaveBeenCalled();
  });
});
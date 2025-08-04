import { SQLClientDAO } from "../src/Dao/SQL/SQLClientDAO"
import { Client } from '../src/Model/Client';
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

describe('SQLClientDAO', () => {
  let dao: SQLClientDAO;

  beforeEach(() => {
    dao = new SQLClientDAO();
    jest.clearAllMocks();
  });

  it('should create a client successfully', async () => {
    mockQuery.mockResolvedValueOnce({});

    const client = new Client(1, 'Alice', 'alice123', 'securepass', 'token123');
    const result = await dao.create(client);

    expect(mockQuery).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO clients'));
    expect(result).toBe('Client created successfully');
    expect(mockRelease).toHaveBeenCalled();
  });

  it('should find all clients', async () => {
    const fakeRows = [
      { id: 1, name: 'Alice', login: 'alice123', password: 'securepass', token: 'token123' },
      { id: 2, name: 'Bob', login: 'bob456', password: 'anotherpass', token: 'token456' },
    ];
    mockQuery.mockResolvedValueOnce({ rows: fakeRows });

    const result = await dao.findAll();

    expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM clients');
    expect(result).toHaveLength(2);
    expect(result[0]).toBeInstanceOf(Client);
    expect(result[0].name).toBe('Alice');
  });

  it('should find a client by ID', async () => {
    const fakeRow = { id: 3, name: 'Charlie', login: 'charlie', password: 'pass', token: 'tok' };
    mockQuery.mockResolvedValueOnce({ rows: [fakeRow] });

    const result = await dao.findById(3);

    expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM clients WHERE id = 3');
    expect(result).toBeInstanceOf(Client);
    expect(result.name).toBe('Charlie');
  });

  it('should handle DB error in create', async () => {
    mockQuery.mockRejectedValueOnce(new Error('DB is down'));

    const client = new Client(99, 'ErrorUser', 'err', 'fail', 'x');

    await expect(dao.create(client)).rejects.toThrow('Database operation failed');
    expect(mockRelease).toHaveBeenCalled();
  });
});

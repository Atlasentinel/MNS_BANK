import { SQLClientDAO } from "../src/Dao/SQL/SQLClientDAO";
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

  it('should findByLoginAndPassword return client if found', async () => {
    const fakeRow = { id: 1, name: 'Alice', login: 'alice', password: 'pass', token: 'tok' };
    mockQuery.mockResolvedValueOnce({ rows: [fakeRow] });

    const result = await dao.findByLoginAndPassword('alice', 'pass');
    expect(mockQuery).toHaveBeenCalledWith(expect.stringContaining("WHERE login = 'alice' AND password = 'pass'"));
    expect(result).toBeInstanceOf(Client);
    expect(result?.name).toBe('Alice');
    expect(mockRelease).toHaveBeenCalled();
  });

  it('should findByLoginAndPassword return null if not found', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [] });

    const result = await dao.findByLoginAndPassword('bob', 'nopass');
    expect(result).toBeNull();
    expect(mockRelease).toHaveBeenCalled();
  });

  it('should throw error if findByLoginAndPassword fails', async () => {
    mockQuery.mockRejectedValueOnce(new Error('DB error'));
    await expect(dao.findByLoginAndPassword('fail', 'fail')).rejects.toThrow('Database operation failed');
    expect(mockRelease).toHaveBeenCalled();
  });

  it('should create a client successfully', async () => {
    mockQuery.mockResolvedValueOnce({});
    const client = new Client(1, 'Alice', 'alice', 'pass', 'tok');
    const result = await dao.create(client);
    expect(mockQuery).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO clients'));
    expect(result).toBe('Client created successfully');
    expect(mockRelease).toHaveBeenCalled();
  });

  it('should handle DB error in create', async () => {
    mockQuery.mockRejectedValueOnce(new Error('DB is down'));
    const client = new Client(99, 'ErrorUser', 'err', 'fail', 'x');
    await expect(dao.create(client)).rejects.toThrow('Database operation failed');
    expect(mockRelease).toHaveBeenCalled();
  });

  it('should update a client successfully', async () => {
    mockQuery.mockResolvedValueOnce({});
    const client = new Client(2, 'Bob', 'bob', 'pass2', 'tok2');
    const result = await dao.update(client);
    expect(mockQuery).toHaveBeenCalledWith(expect.stringContaining('UPDATE clients SET'));
    expect(result).toBe(true);
    expect(mockRelease).toHaveBeenCalled();
  });

  it('should handle DB error in update', async () => {
    mockQuery.mockRejectedValueOnce(new Error('DB error'));
    const client = new Client(2, 'Bob', 'bob', 'pass2', 'tok2');
    await expect(dao.update(client)).rejects.toThrow('Database operation failed');
    expect(mockRelease).toHaveBeenCalled();
  });

  it('should find all clients', async () => {
    const fakeRows = [
      { id: 1, name: 'Alice', login: 'alice', password: 'pass', token: 'tok' },
      { id: 2, name: 'Bob', login: 'bob', password: 'pass2', token: 'tok2' },
    ];
    mockQuery.mockResolvedValueOnce({ rows: fakeRows });

    const result = await dao.findAll();
    expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM clients');
    expect(result).toHaveLength(2);
    expect(result[0]).toBeInstanceOf(Client);
    expect(result[1].name).toBe('Bob');
    expect(mockRelease).toHaveBeenCalled();
  });

  it('should handle DB error in findAll', async () => {
    mockQuery.mockRejectedValueOnce(new Error('DB error'));
    await expect(dao.findAll()).rejects.toThrow('Database operation failed');
    expect(mockRelease).toHaveBeenCalled();
  });

  it('should find a client by ID', async () => {
    const fakeRow = { id: 3, name: 'Charlie', login: 'charlie', password: 'pass', token: 'tok' };
    mockQuery.mockResolvedValueOnce({ rows: [fakeRow] });

    const result = await dao.findById(3);
    expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM clients WHERE id = 3');
    expect(result).toBeInstanceOf(Client);
    expect(result.name).toBe('Charlie');
    expect(mockRelease).toHaveBeenCalled();
  });

  it('should handle DB error in findById', async () => {
    mockQuery.mockRejectedValueOnce(new Error('DB error'));
    await expect(dao.findById(42)).rejects.toThrow('Database operation failed');
    expect(mockRelease).toHaveBeenCalled();
  });

  it('should call delete and return todo', async () => {
    const result = await dao.delete(1);
    expect(result).toBe('todo');
  });
});
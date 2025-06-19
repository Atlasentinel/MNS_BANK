import request from 'supertest';
import app from '../src/app';

describe('ClientController', () => {
  it('doit retourner le solde du client 1', async () => {
    const response = await request(app).get('/client/1/balance');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('balance');
    expect(typeof response.body.balance).toBe('number');
  });

  it('retourne une erreur si le client n\'existe pas', async () => {
    const response = await request(app).get('/client/999/balance');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
  });
});

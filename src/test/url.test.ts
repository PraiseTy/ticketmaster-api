import request from 'supertest';
import { app } from '../app';

describe('GET /', () => {
  it('should return Initial Commit', async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('Initial Commit');
    expect(response.status).toBe(200);
  });
});

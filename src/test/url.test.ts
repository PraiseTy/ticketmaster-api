import { TestFactory } from './factory';

describe('GET /', () => {
  const factory = new TestFactory();

  beforeEach(async () => {
    await factory.init();
  });

  afterEach(async () => {
    await factory.close();
  });

  it('should return Initial Commit', async () => {
    const response = await factory.app.get('/');
    expect(response.text).toBe('Initial Commit');
    expect(response.status).toBe(200);
  });
});

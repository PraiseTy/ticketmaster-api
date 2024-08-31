import { TestFactory } from './factory';

describe('Ticketmaster', () => {
  describe('GET /', () => {
    const factory = new TestFactory();

    beforeEach((done) => {
      factory.init().then(done);
    });

    afterEach((done) => {
      factory.close().then(done);
    });

    it('should return Initial Commit', async () => {
      const response = await factory.app.get('/');
      expect(response.text).toBe('Initial Commit');
      expect(response.status).toBe(200);
    });
  });

  describe('POST /artists', () => {
    const factory = new TestFactory();

    beforeEach((done) => {
      factory.init().then(done);
    });

    afterEach((done) => {
      factory.close().then(done);
    });

    it('should save the artist and return their details', async () => {
      // const response = await factory.app.post('/artists').send({
      //   firstName: 'Praise',
      //   lastName: 'Toyosi',
      //   email: 'pt@example.com',
      //   password: 'pass1',
      //   genre: ['reggae', 'pop'],
      //   website: 'http:website.com',
      //   nationality: 'Nigerian',
      //   social_media_url: { name: 'Przy', link: 'ig-przy' },
      //   picture: ' '
      // });
      const artistData = {
        firstName: 'Praise',
        lastName: 'Toyosi',
        email: 'pt@example.com',
        password: 'pass1',
        genre: ['reggae', 'pop'],
        website: 'http://website.com',
        nationality: 'Nigerian',
        social_media_url: { name: 'Przy', link: 'ig-przy' },
        picture: ' '
      };

      const response = await factory.app.post('/artists ').send(artistData);

      console.log(response);
      // expect(response).toBe('Artist created successfully');
      expect(response.status).toBe(201);
    });
  });
});
// describe('GET /', () => {
//   const factory = new TestFactory();

//   beforeEach((done) => {
//     factory.init().then(done);
//   });

//   afterEach((done) => {
//     factory.close().then(done);
//   });

//   it('should return Initial Commit', async () => {
//     const response = await factory.app.get('/');
//     expect(response.text).toBe('Initial Commit');
//     expect(response.status).toBe(200);
//   });
// });

// describe('POST /artists', () => {
//   const factory = new TestFactory();

//   beforeEach((done) => {
//     factory.init().then(done);
//   });

//   afterEach((done) => {
//     factory.close().then(done);
//   });

//   it('should save the artist and return their details', async () => {
//     const response = await factory.app.post('/artists').send({
//       firstName: 'Praise',
//       lastName: 'Toyosi',
//       email: 'pt@example.com',
//       password: 'pass1',
//       genre: ['reggae', 'pop'],
//       website: 'http:website.com',
//       nationality: 'Nigerian',
//       social_media_url: { name: 'Przy', link: 'ig-przy' },
//       picture: ' '
//     });
//     console.log(response);
//     // expect(response).toBe('Artist created successfully');
//     expect(response.status).toBe(201);
//   });
// });

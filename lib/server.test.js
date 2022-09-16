import request from 'supertest';
import { serve } from './server.js';


describe('The TCP server', () => {
  let server = null;

  beforeEach(() => {
    // Deliberately omit the port so we get an available one.
    server = serve('localhost', undefined);
  });

  afterEach(() => {
    server.close();
  });


  it('connects on the default port', async () => {
    await request(server)
      .get('/')
      .expect(200);
  });

  it('connects on specific route', async () => {
    await request(server)
      .get('/post')
      .expect(200);
  });

  it('connecting to the /mail', async () => {
    await request(server)
    .post('/mail')
    .expect(204);
  });

  it('receives a 404 when requesting an unknown resource/method', async () => {
    await request(server)
      .put('/gremlin')
      .expect(404);
  });

  
});

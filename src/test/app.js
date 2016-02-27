import request from 'supertest';
import app from '../app';

describe('app', function () {
  it('tests sms', function (done) {
    request(app)
      .post('/sms')
      .expect(200)
      .end(done);
  });
});
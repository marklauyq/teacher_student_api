const expect = require('expect');
const request = require('supertest');
const app = require('./server');


it('to retrieve the home api page', (done) => {
    request(app)
        .get('/')
        .expect(200)
        .end(done);
});
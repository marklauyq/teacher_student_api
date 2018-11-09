/**
 * This will be where i test the base routes if the are not attached to a specific model
 */

const expect = require('expect');
const request = require('supertest');
const app = require('../server');


it('should be able to retrieve the home api page', (done) => {
    request(app)
        .get('/')
        .expect(200)
        .end(done);
});


it('should be able to register a one student to a teacher' ,(done) =>{
    request(app)
        .get('/register')
        .expect(200)
        .end(done);
});

it('should be able to register a group of students to a teacher' ,(done) =>{
    done();
}); 

it('should throw an error if any of the email is not valid' , (done) => {
    done();
})



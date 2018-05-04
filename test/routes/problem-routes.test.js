const { app, expect } = require('../common');

/* Get a reference to the Problem model */
const Problem = app.models.Problem;

const request = require('supertest');

describe('GET /api/problems', function() {
    it('respond with json', function(done) {
        //console.log(request(app).get('/api/Problems'))
        request(app)
        .get('/api/Problems')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});

describe('POST /api/problems', function() {
    it('respond with json', function(done) {
        //console.log(request(app).get('/api/Problems'))
        request(app)
        .get('/api/Problems')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});
const { app, expect } = require('../common');

/* Get a reference to the Problem model */
const Problem = app.models.Problem;

const request = require('supertest');
const express = require('express');

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'tobi' });
});

// request(app)
//     .get('/api/Problems')
//     .expect('Content-Type', /json/)
//     .expect(200)
//     .end(function(err, res) {
//         if (err) {
//             //console.log(err);
//             throw err;
//         }
//     });

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
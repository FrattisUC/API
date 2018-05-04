'use strict';

var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

// describe('/Student', () => {

//   var server = require('../server/server')
//   var request = require('supertest')(server)
//   var expect = require('expect.js')

//   var Student

//   before(function() {
//       Student = server.models.Student
//   })

//   beforeEach(function (done) {
//       Student.upsert({id: 1, points: 5000}, function() { done() })
//   })

//   it('Post a new student', function (done) {
//       request.post('/api/Students').send({points: 5000}).expect(200, done)
//    })
// })

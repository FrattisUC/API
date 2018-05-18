'use strict';

const { app, expect } = require('../common');

// Get a reference to the Problemset model
const Problemset = app.models.Problemset;

describe("Validation", function(){

  it('should reject an endTime bigger than startTime', function(){

    return Problemset.create({ name: "test-problemset", startTime: "18/05/2017", endTime: "18/02/2017"})
      .then(res => Promise.reject('ProblemSet should not be created'))
      .catch(err => {
        expect(err.message).to.contain("End time should be bigger than the start time");
        expect(err.statusCode).to.be.equal(422);
      });

  });

});
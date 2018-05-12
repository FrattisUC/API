// 'use strict';

const { app, expect } = require('../common');

// Get a reference to the Example model
const HumanRole = app.models.HumanRole;

describe("It should", function(){
  it('should reject a duplicate name', function(){
    return Promise.resolve()
      .then(() => HumanRole.create({ name: 'Admin'}))
      .then(() => HumanRole.create({ name: 'Admin'}))
      .then(res => Promise.reject("El rol no se debería crear"))
      .catch(err => {
        expect(err.message).to.contain('Details: `name` is not unique');
        expect(err.statusCode).to.be.equal(422);
      });

  });
});
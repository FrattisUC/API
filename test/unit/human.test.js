'use strict';

const { app, expect } = require('../common');

// Get a reference to the Human model
const Human = app.models.Human;

describe("It should", function(){
  it('should reject a duplicate email', function(){
    return Promise.resolve()
      .then(() => Human.create({ email: 'repeated-email@email.com'}))
      .then(() => Human.create({ email: 'repeated-email@email.com'}))
      .then(res => Promise.reject("El humano no se debería crear"))
      .catch(err => {
        expect(err.message).to.contain('Details: `email` is not unique');
        expect(err.statusCode).to.be.equal(422);
      });

  });
});
'use strict';

const { app, expect } = require('../common');

// Get a reference to the Human model
const Human = app.models.Human;

describe("Validation", function(){
  // Test validación duplicados
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

  // Test validación incorrecto email
  it('should reject an invalid email', function(){
    return Human.create({ email: "email@invalido@gmail.com"})
      .then(res => Promise.reject('Human should not be created'))
      .catch(err => {
        expect(err.message).to.contain("Email invalid");
        expect(err.statusCode).to.be.equal(422);
      });

  });

  // Test validación correcto email
  it('should accept valid email', function(){
    return Human.create({ email: "valido@gmail.com"})
      .then(res => {
        expect(res.email).to.equal("valido@gmail.com");
      });

  });

});
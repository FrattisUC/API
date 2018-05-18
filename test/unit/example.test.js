'use strict';

// Se usa este comando en consola para correr los tests
// del proyecto:
// npm run test

const { app, expect } = require('../common');

// Get a reference to the Example model
const Example = app.models.Example;

// ///////////////////////////////////////////////
//                                              //
//       SE DEFINEN VARIOS TIPOS DE TESTS       //
//                                              //
// ///////////////////////////////////////////////

// Test para existencia:
describe("It should resolve", function(){
  it('a Example.find', function(){
    return Example
      .find()
      .then(res => console.log(res));
  });
});

// Test para métodos creados por mí
// Test 1
describe('Custom methods', function(){
  it('should allow buying a product', function(){
    const product = new Example({ name: 'kdjf', price: 299});
    return product.buy(10, function(err, res){
      expect(res.status).to.contain('You bought 10 products');
    });
  });

// Test 2
  it('should not allow buying a negative product quantity', function(){
    const product = new Example({ name: 'buy-product', price: 299});
    return product.buy(-10, function(err, res){
      expect(err).to.contain("invalid quantity -10");
    });
  });
});

// Test para validación
describe('Validation', function(){

  // Test validación largo
  // (Tipo de test más común)
  it('should reject a name < 3 chars', function(){
    return Example.create({ name: "a", price: 299})
      .then(res => Promise.reject('Product should not be created'))
      .catch(err => {
        expect(err.message).to.contain("Name should be at least 3 characters");
        expect(err.statusCode).to.be.equal(422);
      });

  });

  // Test validación duplicados
  it('should reject a duplicate email', function(){
    return Promise.resolve()
      .then(() => Example.create({ email: 'repeated-email@email.com'}))
      .then(() => Example.create({ email: 'repeated-email@email.com'}))
      .then(res => Promise.reject("La instancia ej no se debería crear"))
      .catch(err => {
        expect(err.message).to.contain('Details: `email` is not unique');
        expect(err.statusCode).to.be.equal(422);
      });

  });

});

// Test para asegurar que una instancia se guarda como esperamos
describe('Correct save', function(){
  it('should store a correct product', function(){
    return Example.create({ name: 'all good', price: 100})
      .then(res => {
        expect(res.name).to.equal("all good");
        expect(res.price).to.be.equal(100);
      });
  });
});
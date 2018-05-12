// 'use strict';

// Se usa este comando en consola para correr los tests
// del proyecto:
// npm run test

const { app, expect } = require('../common');

// Get a reference to the Example model
const Example = app.models.Example;

describe("It should resolve", function(){
  it('a Example.find', function(){
    return Example
      .find()
      .then(res => console.log(res));
  });
});
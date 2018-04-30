'use strict';

module.exports = function(Humanrole) {
  let isEmail = require('validator/lib/isEmail');

  // Validación name
  Humanrole.validatesUniquenessOf('name');

};

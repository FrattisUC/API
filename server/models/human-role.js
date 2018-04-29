'use strict';

module.exports = function(Humanrole) {
  // Validación name
  Humanrole.validatesUniquenessOf('name');

};

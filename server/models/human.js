'use strict';

module.exports = function(Human) {
  let isEmail = require('validator/lib/isEmail');

  // validación email
  const validEmail = function (email) {
    return(isEmail(email));
  };

  const validateEmail = function(err){
    if(!validEmail(this.email)){
      err();
    }
  };

  Human.validate('email', validateEmail, {
    message: 'Email invalid', }
    );  

};

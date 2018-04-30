'use strict';

module.exports = function(Submission) {
  let isURL = require('validator/lib/isURL');

  // Validación status;
  const statusList = {"0" : "pending", "1" : "done", "2" : "failure"};

  const validStatus = function(status){
    return(!!statusList[status]);
  };

  const validateStatus = function(err){
    if(!validStatus(this.status)){
      err();
    }
  };

  Submission.validate('status', validateStatus, {
    message: 'Status invalid', }
    );

  // validación url_content
  const validURL = function (urlContent) {
    return(isURL(urlContent));
  };

  const validateURL = function(err){
    if(!validURL(this.url_content)){
      err();
    }
  };

  Submission.validate('url_content', validateURL, {
    message: 'Not a valid URL', }
    );

};

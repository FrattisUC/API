'use strict';

module.exports = function(Submission) {

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


};

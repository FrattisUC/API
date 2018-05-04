'use strict';

module.exports = function(Problemset) {

  const biggerDate = function(startDate, endDate){
    return(endDate > startDate);
  };

  const validateBiggerDate = function(err){
    if(!biggerDate(this.startTime, this.endTime)){
      err();
    }
  };

  Problemset.validate('endTime', validateBiggerDate, {
    message: 'End time should be bigger than the start time',
  });

};

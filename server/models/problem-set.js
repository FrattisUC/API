'use strict';

module.exports = function(Problemset) {

  const biggerDate = function(start_date, end_date){
    return(end_date > start_date)
  }

  const validateBiggerDate = function(err){
    if(!biggerDate(this.start_time, this.end_time)){
      err()
    }
  }

  Problemset.validate('end_time', validateBiggerDate, {
    message: 'End time should be bigger than the start time',
  });

};

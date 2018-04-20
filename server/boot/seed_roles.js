var async = require('async');
var psqlDatasourceName = 'psql_db';

module.exports = function(app) {
  //data sources
  var psqlDs = app.dataSources[psqlDatasourceName];
  //create all models
  async.parallel({
    roles: async.apply(createRoles)
  }, function(err, results) {
    if (err) throw err;
    console.log('> models created sucessfully');
  });
  //create reviewers
  function createRoles(cb) {
    psqlDs.automigrate('Role', function(err) {
      if (err) return cb(err);
      var Role = app.models.HumanRole;
      Role.create([
        {name: 'Superadmin'},
        {name: 'Admin'},
        {name: 'Teacher'},
        {name: 'TeacherAssistant'},
        {name: 'Student'},
        {name: 'UnregisteredStudent'}
      ], cb);
    });
  }

};

var server = require('./../server/server');
var ds = server.dataSources.psql_db;

// CADA VEZ QUE SE CREE UN NUEVO MODELO SE DEBE AGREGAR EN ESTA LISTA
var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role', 'Problem',
                'Test', 'ProblemSet', 'Submission', 'Human', 'Course', 'HumanRole',
                'ProblemProblemSet', 'User_role_course'];
ds.automigrate(lbTables, function(er) {
  if (er) {
    console.log("error en las migraciones!!!!!");
    throw er;
  } 
  console.log('Loopback tables [' - lbTables - '] created in ', ds.adapter.name);
  ds.disconnect();
});
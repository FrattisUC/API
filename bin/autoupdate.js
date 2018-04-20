var server = require('./../server/server');
process.setMaxListeners(30) ;
var ds = server.dataSources.psql_db;

// CADA VEZ QUE SE CREE UN NUEVO MODELO SE DEBE AGREGAR EN ESTA LISTA
var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role', 'Problem',
                'Test', 'ProblemSet', 'Submission', 'Human', 'Course', 'HumanRole',
                'ProblemProblemSet', 'User_role_course'];
ds.autoupdate(lbTables, function(er) {
  if (er) {
    console.log("error en las migraciones!!!!!");
    throw er;
  } 
  console.log('Loopback tables [' - lbTables - '] created in ', ds.adapter.name);
  ds.disconnect();
});


// , 'Test', 'ProblemSet', 'Submission', 'Human', 'Course', 'HumanRole', 'User_role_course'
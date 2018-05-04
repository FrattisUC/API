// ESTO LO SACAMOS DE:
// https://github.com/strongloop/loopback-connector-postgresql/issues/165
// CON LA INTENCIÓN DE QUE SE HICIERAN AUTOUPDATES DE LAS TABLAS

// var async = require( 'async' );
// module.exports = function( app, cb ) {
//   console.log(app);
//   var datasources = Object.keys( app.dataSources );
//   async.eachSeries( datasources, function( dsName, cb ) {
//     var ds = app.dataSources[ dsName ];
//     ds.isActual( function( err, actual ) {
//       if ( err ) return cb( err );
//       if ( actual ) { 
//         console.log( 'datasource', dsName, 'is up to date' );
//         return cb();
//       }
//       ds.autoupdate( function( err ) {
//         if ( err ) return cb( err );
//         console.log( 'datasource', dsName, 'updated' );
//         cb();
//       });
//     });
//   }, cb );
// };
// console.log('schema finished updating')
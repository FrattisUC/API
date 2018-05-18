'use strict';

const { app, expect } = require('../common');

// Get a reference to the Problemset model
const Problemset = app.models.Problemset;

describe("Validation", function(){

// Validación de status depende de la variable statusList que
// va a cambiarse a un archivo json.
// Por lo que queda pendiente

  // Test validación correcta de times
  it('should accept valid status', function(){
    const status_in = "2";
    console.log('ESTE TEST ESTÁ INCOMPLETO');

    // QUEDÉ AQUÍ:
    // HAY QUE CREAR UN PROBLEMA Y UN USUARIO
    // PARA HACER LOS TESTS DE SUBMISSION

    // return Proset.create({ status: status_in, startTime: "18/05/2017", endTime: "18/07/2017" })
    //   .then(res => {
    //     expect(res.startTime).to.equal("18/05/2017");
    //     expect(res.endTime).to.equal("18/07/2017");
    //   });

  });

});
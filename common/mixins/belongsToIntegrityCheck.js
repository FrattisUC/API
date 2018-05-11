'use strict';

let _ = require('lodash');

let checkBelongsToIntegrity = function (ctx, next) {
  if (ctx.instance) {
    let relations = ctx.Model.definition.settings.relations;
    let relationsArray = _.map(relations, rel => {
      return { modelName: rel.model, fk: rel.foreignKey, type: rel.type };
    });

    // Utiliza Lodash para transformar los objetos de las relaciones en tablas de la forma:
    /*
      [
        { modelName: 'achat', fk: 'achat_id', type: 'belongsTo' },
        { modelName: 'FED_AGENT', fk: 'agent_rfagent', type: 'belongsTo' }
      ]
    */

    let thisModel = ctx.Model;
    // The message here will be returned in case of failure to check integrity constraints
    let message = "";
    // The table of promises corresponding to the requests verifying the constraints
    let promiseArray = [];

    relationsArray.forEach(function (relation) {
      if (relation.type == 'belongsTo') {
        let parentModelName = relation.modelName;
        let parentModel = thisModel.app.models[parentModelName];
        let parentId = ctx.instance[relation.fk];

        // El modelo padre aquí corresponde al id demandado por el modelo hijo
        promiseArray.push(parentModel.findById(parentId).then(function (parentInstance) {
          if (parentInstance === null) {
            message += 'No ' + parentModelName + ' with "' + parentId + '" id. ';
          }
        }));

      }
    }
    );
    
    // Once all the promises have been determined and lead to a message in case of non respect of the integrity constraint,
    // they are grouped together in a common promise resolved when all are resolved and which sends back the message in case
    // of non-respect of constraint
    Promise.all(promiseArray)
      .then(
        function(){
          next(message);
        },
        console.error)
      .catch(function (err) {
        next(err);
      });
  }
};

module.exports = function (Model, options) {
  Model.observe('before save', checkBelongsToIntegrity);
};
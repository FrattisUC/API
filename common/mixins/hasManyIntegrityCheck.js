'use strict';

let _ = require('lodash');

let checkHasManyIntegrity = function (ctx, next) {
  if (ctx.where) {
    let relations = ctx.Model.definition.settings.relations;
    let relationsArray = _.map(relations, rel => {
      return { modelName: rel.model, fk: rel.foreignKey, type: rel.type };
    });

    /* On utilise Lodash to transform the object of relations into a table of form
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
      if (relation.type == 'hasMany') {
        let childrenModelName = relation.modelName;
        let childrenModel = thisModel.app.models[childrenModelName];
        let parentId = ctx.where.id;
        let whereObject = {};
        whereObject[relation.fk] = ctx.where.id;
        // On cherche les enfants éventuels
        promiseArray.push(childrenModel.find({
          where: whereObject
        }).then(function (data) {
          if (data.length > 0) { // Si il y a des enfants, on renvoit une erreur
            message += 'This "' + thisModel.modelName + '" has "' + childrenModelName + '", and can\'t be deleted. ';
          }
        }));

      }
    }
    );

    /* Once all the promises have been determined and lead to a message in case of non respect of the integrity constraint,
    they are grouped together in a common promise resolved when all are resolved and which sends back the message in case
    of non-respect of constraint */
    Promise.all(promiseArray)
      .then(
      function () {
        next(message);
      },
      console.error)
      .catch(function (err) {
        next(err);
      });
  }
};

module.exports = function (Model, options) {
  Model.observe('before delete', checkHasManyIntegrity);
};
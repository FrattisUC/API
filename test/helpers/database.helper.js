const { app } = require('../common');
const Problem = app.models.Problem;
const ProblemSet = app.models.ProblemSet;

module.exports = {
    givenEmptyDatabase
}

async function givenEmptyDatabase() {
    await app.models.Problem.destroyAll();
    await app.models.ProblemSet.destroyAll();
}
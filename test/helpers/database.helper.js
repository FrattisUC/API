const { app } = require('../common');
const Problem = app.models.Problem;
const ProblemSet = app.models.ProblemSet;
const Course = app.models.Course;
const Human = app.models.Human;

module.exports = {
    givenEmptyDatabase
}

async function givenEmptyDatabase() {
    await app.models.Problem.destroyAll();
    await app.models.ProblemSet.destroyAll();
    await app.models.Course.destroyAll();
    await app.models.Human.destroyAll();
}
const { app, expect } = require('../common');

/* Get a reference to the Problem model */
const Problem = app.models.Problem;

describe('It should resolve', () => {
    it('a Problem.find', () => {
        return Problem.find()
            .then(res => console.log(res));
    })
})
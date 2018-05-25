const { app, expect } = require('../common');
const helper = require('./../helpers/database.helper.js');

helper.givenEmptyDatabase().then(
    res => {
        console.log("Empty Database");
        process.exit(0);
});

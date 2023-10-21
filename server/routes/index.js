const route = require('express').Router();
const authRoute = require('./Auth');


route.use('/users', authRoute);

module.exports = route;
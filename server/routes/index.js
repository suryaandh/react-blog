const route = require('express').Router();
const authRoute = require('./Auth');
const postRoute = require('./Post');


route.use('/users', authRoute);
route.use('/posts', postRoute)

module.exports = route;
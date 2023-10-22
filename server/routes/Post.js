const route = require('express').Router();
const { PostController } = require('../controllers');

route.get('/', PostController.getPosts);
route.post('/create', PostController.createPost);
route.get('/:id', PostController.getPostById);

module.exports = route;
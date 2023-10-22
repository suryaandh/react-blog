const route = require('express').Router();
const { PostController } = require('../controllers');

route.get('/', PostController.getPosts);
route.post('/create', PostController.createPost);
route.get('/:id', PostController.getPostById);
route.get('/:id/user', PostController.getPostByUserId);
route.put('/:id/status', PostController.updatePostStatus);

module.exports = route;
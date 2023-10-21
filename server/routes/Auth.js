const route = require('express').Router();
const { AuthController } = require('../controllers');
const { hashPassword } = require('../middleware/authMiddleware');

route.get('/', AuthController.getUser);
route.post('/login', AuthController.login);
route.post('/register', hashPassword, AuthController.register);

module.exports = route;
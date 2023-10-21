const { User } = require('../models');
const { createToken } = require('../middleware/authMiddleware');
const bcrypt = require('bcrypt');

class AuthController {

  static async getUser(req, res) {
    try {
      const user = await User.findAll();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: 'Register failed' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);


      if (passwordMatch) {
        const token = createToken({ id: user.id, username: user.username });
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: 'Login failed' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Login failed' });
    }
  }

  static async register(req, res) {
    const { email, password, name, dateOfBirth, image, description, address } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      const user = await User.create({
        email, password, name, dateOfBirth, image, description, address
      });

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Registration failed' });
    }
  }
}

module.exports = AuthController;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = process.env.SECRET_KEY;

// Create Token 
function createToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' }
  );
}

//Authenticate
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  jwt.verify(token, secretKey, (err, decoded) => {
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }

    req.user = decoded;
    next();
  });
};

// Encryption
const hashPassword = async (req, res, next) => {
  const saltRounds = 10;

  try {
    const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPwd;
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Error hashing password' });
  }
};

module.exports = {
  createToken, authenticate, hashPassword
}
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');

function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    userName: user.userName,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return { token };
}

module.exports = generateToken;

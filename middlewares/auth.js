const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const error = function () {
    res.status(403).send({ message: 'Se requiere autorización' });
  };

  if (!authorization || !authorization.startsWith('Bearer')) return error();

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return error();
  }

  req.user = payload;
  next();
};

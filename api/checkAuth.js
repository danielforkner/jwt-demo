const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  if (!auth) {
    res.status(401).send({
      message: 'you must provide a valid token to perform the requested action',
    });
  } else {
    const token = auth.slice(prefix.length);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      res.status(401).send({
        message:
          'you must provide a valid token to perform the requested action',
      });
    } else {
      req.body = { ...req.body, token: decoded };
      console.log('token is good');
      next();
    }
  }
};

module.exports = checkAuth;

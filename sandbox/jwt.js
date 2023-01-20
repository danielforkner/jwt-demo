const jwt = require('jsonwebtoken');

// sign a token
const token = jwt.sign(
  { info: 'info', message: 'message', name: 'username' },
  'secret'
);

console.log(token);

// verify a token
const decoded = jwt.verify(token, 'secret');

console.log('valid token: ', decoded);

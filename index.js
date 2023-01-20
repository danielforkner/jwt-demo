const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { createUser, createEntry } = require('./db/index');
const app = express();
const jwt = require('jsonwebtoken');

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  console.log('BODDY LOGGER', req.body);
  next();
});

//routes
app.get('/', (req, res, next) => {
  console.log('get');
  res.sendFile(path.join(__dirname, '/public/index.html'));
  next();
});

//flaws:
//1. no validation on username and password
//2. no token being sent back to client
//3. no password hashing
app.post('/register', async (req, res, next) => {
  console.log('attempting to register');
  const { username, password } = req.body;
  try {
    const user = await createUser({ username, password });
    console.log(user);
    const token = jwt.sign({ username: user.username, id: user.id }, 'secret');
    res.status(200).send({ message: 'registered successfully!', token: token });
  } catch (error) {
    console.error(error);
    res
      .status(409)
      .send({ error: 'register error', message: 'could not register' });
  }
});

app.use('/entry', (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  console.log('auth', auth);
  if (!auth) {
    res.status(401).send({
      message: 'you must provide a valid token to perform the requested action',
    });
  } else {
    const token = auth.slice(prefix.length);
    const decoded = jwt.verify(token, 'secret');
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
});

// flaws:
//1. no token validation
//2. no validation on title
app.post('/entry', async (req, res, next) => {
  console.log('attempting to create entry');
  const { title, content, token } = req.body;
  try {
    await createEntry({ title, content, username: token.username });
    res.status(200).send({ message: 'entry created successfully!' });
  } catch (error) {
    console.error(error);
    res
      .status(409)
      .send({ error: 'entry error', message: 'could not create entry' });
  }
});

const client = require('./db/client');

app.listen(3000, async () => {
  console.log('listening on port 3000');
  try {
    await client.connect();
    console.log('Connected to the db!');
  } catch (error) {
    console.error(error);
    console.log("Couldn't connect to the db!");
  }
});

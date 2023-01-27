require('dotenv').config();

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { createUser, createEntry } = require('./db/index');
const checkAuth = require('./api/checkAuth');
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

app.post('/register', async (req, res, next) => {
  console.log('attempting to register');
  const { username, password } = req.body;
  try {
    const user = await createUser({ username, password });
    console.log(user);
    const token = jwt.sign(
      { username: user.username, id: user.id },
      process.env.JWT_SECRET
    );
    res.status(200).send({ message: 'registered successfully!', token: token });
  } catch (error) {
    console.error(error);
    res
      .status(409)
      .send({ error: 'register error', message: 'could not register' });
  }
});

app.use('/entry', checkAuth);

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log('listening on port 3000');
  try {
    await client.connect();
    console.log('Connected to the db!');
  } catch (error) {
    console.error(error);
    console.log("Couldn't connect to the db!");
  }
});

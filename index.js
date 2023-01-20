const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { createUser, createEntry } = require('./db/index');
const app = express();

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));

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
    await createUser({ username, password });
    res.status(200).send({ message: 'registered successfully!' });
  } catch (error) {
    console.error(error);
    res
      .status(409)
      .send({ error: 'register error', message: 'could not register' });
  }
});

app.post('/entry', async (req, res, next) => {
  console.log('attempting to create entry');
  const { title, content, username } = req.body;
  try {
    await createEntry({ title, content, username });
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

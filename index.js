const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { createUser } = require('./db/index');
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

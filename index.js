const express = require('express');
const path = require('path');
// const cors = require('cors');
const { createUser } = require('./db/index');
const app = express();

//middleware

//routes
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/register', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    await createUser({ username, password });
    res.status(200).send({ message: 'registered successfully!' });
  } catch (error) {
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

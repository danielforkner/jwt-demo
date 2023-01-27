require('dotenv').config();
const { Client } = require('pg');

const client = new Client(
  process.env.DB_URL || 'postgres://localhost:5432/jwt-demo'
);

module.exports = client;

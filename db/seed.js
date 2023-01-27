const client = require('./client');

const dropTables = async () => {
  console.log('Dropping tables...');
  try {
    await client.query(`
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS entries;
        `);
    console.log('Dropped tables!');
  } catch (error) {
    throw error;
  }
};

const createTables = async () => {
  console.log('Creating tables...');
  try {
    await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        );
        CREATE TABLE entries (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            dateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`);
  } catch (error) {
    throw error;
  }
};

const seedDb = async () => {
  console.log('Seeding database...');
  try {
    await client.connect();
    await dropTables();
    await createTables();
    console.log('Seeding successful!');
  } catch (error) {
    console.error('Error seeding!');
    console.error(error);
  } finally {
    client.end();
    console.log('Client disconnected!');
  }
};

const buildDb = async () => {
  try {
    await dropTables();
    await createTables();
    console.log('Seeding successful!');
  } catch (error) {
    throw error;
  }
};

module.exports = { buildDb, seedDb };

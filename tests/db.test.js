require('dotenv').config();
const { createUser, createEntry } = require('../db');
const client = require('../db/client');
const { buildDb } = require('../db/seed');

// https://jestjs.io/docs/expect

describe('Testing the Database', () => {
  beforeAll(async () => {
    await client.connect();
    await buildDb();
  });

  afterAll(async () => {
    await client.end();
  });
  describe('Create a new User', () => {
    const userToCreate = { username: 'jest', password: '1234' };
    test('A user object is returned', async () => {
      const createdUser = await createUser(userToCreate);
      expect(createdUser).toBeDefined();
    });
  });
});

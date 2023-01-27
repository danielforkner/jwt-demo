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
    let createdUser;
    test('A user object is returned', async () => {
      createdUser = await createUser(userToCreate);
      expect(createdUser).toBeDefined();
    });
    // test('Passwords are hashed', async () => {
    //   expect(createdUser.password).not.toBe(userToCreate.password);
    // });
    test('The created user is the same as the user to create', async () => {
      expect(createdUser.username).toBe('jest');
      expect(createdUser.password).toBe('1234');
    });
    test('Get user by id returns the user', async () => {
      const identicalUser = await getUserById(createdUser.id);
      expect(identicalUser).toEqual(createdUser);
    });
  });
  describe('Create a new Entry', () => {});
});

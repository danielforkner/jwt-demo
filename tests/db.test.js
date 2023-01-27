require('dotenv').config();
const client = require('../db/client');
const { buildDb } = require('../db/seed');
const { createUser, getUserById } = require('../db');

describe('Testing the database', () => {
  beforeAll(async () => {
    await client.connect();
    await buildDb();
  });
  afterAll(async () => {
    await client.end();
  });

  describe('Users', () => {
    const userToCreate = { username: 'jest', password: '1234' };
    const badUserToCreate = { username: 'Bob', password: null };
    let createdUser;
    test('Create User: returns an object', async () => {
      createdUser = await createUser(userToCreate);
      expect(typeof createdUser).toBe('object');
    });
    test('Create User: returns the same user just created', async () => {
      expect(createdUser.username).toBe('jest');
      expect(createdUser.password).toBe('1234');
    });
    test('Get User: can get the user by its id', async () => {
      const identicalUser = await getUserById(createdUser.id);
      expect(identicalUser).toEqual(createdUser);
    });
    test('Create User: prevents null password', async () => {
      await expect(
        createUser(badUserToCreate)
      ).rejects.toThrowErrorMatchingSnapshot();
    });
    test.todo('Create User: prevents empty string password');
  });
});

const client = require('./client');

const createUser = async ({ username, password }) => {
  try {
    await client.query(
      `
        INSERT INTO users (username, password)
        values ($1, $2)
        returning *
        `,
      [username, password]
    );
  } catch (error) {
    throw error;
  }
};

const createEntry = async ({ title, content, username }) => {
  try {
    await client.query(
      `
            INSERT INTO entries (title, content, username)
            values ($1, $2, $3)
            returning *
            `,
      [title, content, username]
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  createEntry,
};

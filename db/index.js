const client = require('./client');

// create a getUserById function

const createUser = async ({ username, password }) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users (username, password)
        values ($1, $2)
        returning *
        `,
      [username, password]
    );
    return user;
  } catch (error) {
    throw error;
  }
};

const createEntry = async ({ title, content, username }) => {
  try {
    const {
      rows: [entry],
    } = await client.query(
      `
            INSERT INTO entries (title, content, username)
            values ($1, $2, $3)
            returning *
            `,
      [title, content, username]
    );
    return entry;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  createEntry,
};

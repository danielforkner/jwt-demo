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

module.exports = {
  createUser,
};

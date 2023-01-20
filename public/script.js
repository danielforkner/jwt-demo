const registerUser = async () => {
  try {
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'test',
        password: 'test',
      }),
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

const createEntry = async () => {
  const response = await fetch('http://localhost:3000/entry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'test',
      content: 'test content for my new entry',
      username: 'test',
    }),
  });
};

document.getElementById('registerBtn').addEventListener('click', registerUser);
document
  .getElementById('createEntryBtn')
  .addEventListener('click', createEntry);

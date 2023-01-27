let token;

const registerUser = async ({ username, password }) => {
  try {
    const response = await fetch('https://jwt-demo.onrender.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const result = await response.json();
    token = result.token;
  } catch (error) {
    console.error(error);
  }
};

const createEntry = async ({ title, content }) => {
  const response = await fetch('https://jwt-demo.onrender.com/entry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      content,
    }),
  });
};

document.getElementById('registerForm').addEventListener('submit', (ev) => {
  ev.preventDefault();
  const username = document.getElementById('username');
  const password = document.getElementById('password');
  registerUser({ username: username.value, password: password.value });
  username.value = '';
  password.value = '';
});
document.getElementById('entryForm').addEventListener('submit', (ev) => {
  ev.preventDefault();
  const title = document.getElementById('title');
  const content = document.getElementById('content');
  createEntry({ title: title.value, content: content.value });
  title.value = '';
  content.value = '';
});

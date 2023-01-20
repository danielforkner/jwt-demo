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

document.getElementById('registerBtn').addEventListener('click', registerUser);

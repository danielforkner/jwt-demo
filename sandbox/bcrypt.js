const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0//P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const hashPassword = async () => {
  const hashed = await bcrypt.hash(myPlaintextPassword, saltRounds);
  return hashed;
};

const checkPassword = async (plainText, hashed) => {
  const compare = await bcrypt.compare(plainText, hashed);
  return compare;
};

const runFile = async () => {
  const hashed = await hashPassword();
  const isTheSame = await checkPassword('badpassword', hashed);
  console.log(isTheSame);
};

runFile();

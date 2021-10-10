const bcrypt = require('bcrypt');

const password = process.argv.pop();
const hashedPassword = bcrypt.hashSync(password, 10)
console.log('Password:', password);
console.log('Hash:', hashedPassword);
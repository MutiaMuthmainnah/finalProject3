const bcrypt = require("bcrypt");
const saltRounds = 10;

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
}

function comparePassword(password, hash) {
  const result = bcrypt.compareSync(password, hash);
  return result;
}

module.exports = { hashPassword, comparePassword };

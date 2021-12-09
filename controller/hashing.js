const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(7);
//createHash received  password from request, hash it and return

module.exports = {
  hashingPassword(password) {
    return bcrypt.hashSync(password, salt);
  },
  checkingHash(password, hash) {
    //return tru true or false after checking hash
    return bcrypt.compareSync(password, hash);
  },
};

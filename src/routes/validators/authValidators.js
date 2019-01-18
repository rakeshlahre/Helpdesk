const {
  validatePassword,
  validateUsername,
  validateUsernameAvailable,
} = require('./validators');

const db = require('../../db');
const throwValidationErrors = require('./throwValidationErrors');

const validateLoginData = async function (req) {
  validateUsername(req);
  validatePassword(req);

  await throwValidationErrors(req);
};

const validateRegister = async function (req) {
  validatePassword(req);
  validateUsername(req);
  validateUsernameAvailable(req, db);

  await throwValidationErrors(req);
};

module.exports = {
  validateLoginData,
  validateRegister,
};

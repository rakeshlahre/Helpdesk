const config = require('config');
const promise = require('bluebird');

const initOptions = {
  promiseLib: promise, // overriding the default (ES6 Promise);
  error (error, e) {
    error.DB_ERROR = true;
  }
};

const pgp = require('pg-promise')(initOptions);
const db = pgp(config.get('DB_CONNECTION_STRING'));

module.exports = {
  logs: require('./models/logs')(db),
  sessions: require('./models/sessions')(db),
  users: require('./models/users')(db),
  db
};

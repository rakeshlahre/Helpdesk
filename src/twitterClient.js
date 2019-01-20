const twitterAPI = require('node-twitter-api');

const client = new twitterAPI({
  consumerKey: 'gZEMqTHgfdR5wWOmG8Lezttf3',
  consumerSecret: 'kzhka8xZuPOC68OUSjigWEMVCk6sqN62tdRMPLUqUHcFrWQpIQ'
});
  

module.exports = client;
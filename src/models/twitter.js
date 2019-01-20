const client = require('../twitterClient');

module.exports = () => {
  const getTimeline = function (type, params, accessToken, accessTokenSecret) {
    return new Promise((resolve, reject) => {
      client.getTimeline(type,
        params,
        accessToken,
        accessTokenSecret,
        function(error, data, response) {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        }
      );
    });

  }
  return {
    getTimeline
  }
}
module.exports = (db) => {
  // Case-insensitive
  const isUserNameAlreadyTaken = async (username) => {
    const existingUserName = await db.oneOrNone('SELECT username FROM users WHERE lower(username) = lower($1)', username);

    return !!existingUserName;
  };

  // Case-insensitive
  const getUserByName = async (username) => {
    const user = await db.oneOrNone('SELECT * FROM users WHERE lower(username) = lower($1)', username);

    return user;
  };

  const getUserByEmail = async (email) => {
    const user = await db.oneOrNone('SELECT * FROM users WHERE lower(email) = lower($1)', email);
    return user;
  };

  const createUser = async (username, password) => {
    const result = await db.one('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
    return result;
  };

  const saveRequestToken = async (userId, token, tokenSecret) => {
    await db.none(`
      UPDATE
        users 
      SET 
        twitter_request_token = $2, twitter_request_token_secret = $3
      WHERE
      id = $1
      `, [userId, token, tokenSecret]);
  }

  const saveAccessToken = async (userId, token, tokenSecret, twitterId, screenName) => {
    await db.none(`
      UPDATE
        users 
      SET 
        twitter_access_token = $2, twitter_access_token_secret = $3,
        twitter_user_id = $4, twitter_screen_name = $5
      WHERE
      id = $1
      `, [userId, token, tokenSecret, twitterId, screenName]);
  }

  const getRequestTokenSecret = async (userId) => {
    const secret = await db.one('SELECT twitter_request_token_secret FROM users WHERE id = $1', userId);

    return secret.twitter_request_token_secret;
  };

  const getAccessToken = async (userId) => {
    const user = await db.one('SELECT * FROM users WHERE id = $1', userId);

    return user;
  }

  return {
    isUserNameAlreadyTaken,
    getUserByName,
    getUserByEmail,
    createUser,
    saveAccessToken,
    saveRequestToken,
    getRequestTokenSecret,
    getAccessToken
  };
};

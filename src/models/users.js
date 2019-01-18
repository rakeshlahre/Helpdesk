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
    console.log(username, password)
    const result = await db.one('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
    return result;
  };

  return {
    isUserNameAlreadyTaken,
    getUserByName,
    getUserByEmail,
    createUser
  };
};

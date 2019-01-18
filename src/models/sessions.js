const uuidV4 = require('uuid/v4');

module.exports = (db) => {
  const getUserBySessionId = async (sessionId) => {
    const user = await db.oneOrNone('SELECT users.* FROM users JOIN active_sessions ON users.id = active_sessions.user_id WHERE active_sessions.id = $1 GROUP BY users.id', sessionId);
    return user;
  };

  const createSession = async (userId, expires, ip, fingerprint) => {
    const result = await db.one('INSERT INTO sessions (id, user_id, expired_at, ip_address, fingerprint) VALUES ($1, $2, NOW() + $3::interval, $4, $5) RETURNING *', [uuidV4(), userId, expires, ip, fingerprint]);
    return result;
  };

  const logoutSession = async (userId, sessionId) => {
    await db.none('UPDATE sessions set logged_out_at = NOW() WHERE user_id = $1 AND id = $2', [userId, sessionId]);
  };

  const logoutAllSessions = async (userId) => {
    await db.none('UPDATE sessions set logged_out_at = NOW() WHERE user_id = $1', userId);
  };

  const getActiveSessions = async (userId) => {
    const result = await db.any('SELECT * FROM active_sessions WHERE user_id = $1', userId);
    return result;
  };


  return {
    getUserBySessionId,
    createSession,
    logoutSession,
    logoutAllSessions,
    getActiveSessions
  };
};

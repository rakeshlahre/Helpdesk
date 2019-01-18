const db = require('./db');
const helpers = require('./helpers');

const attachCurrentUserToRequest = async (req, res, next) => {
  const sessionId = req.cookies.session;

  if (sessionId && helpers.isValidUuid(sessionId)) {
    const user = await db.sessions.getUserBySessionId(sessionId);
    if (user) {
      req.currentUser = user;
    }
  }

  next();
};

const requireLoggedIn = async (req, res, next) => {
 
  if (!req.currentUser) {
    res.status(401).send('Unauthorized');
    return; 
  }

  next();
};

module.exports = {
  attachCurrentUserToRequest,
  requireLoggedIn
};

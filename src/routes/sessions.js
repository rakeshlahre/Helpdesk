const express = require('express');
const db = require('../db');
const mw = require('../middleware');
const {
  validateLogoutSession
} = require('./validators/sessionValidators');

module.exports = () => {
  const router = express.Router();

  router.use(mw.requireLoggedIn);

  router.get('/me', async function (req, res, next) {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

    res.json({
      id: req.currentUser.id,
      username: req.currentUser.username,
      email: req.currentUser.email
    });
  });

  router.get('/active-sessions', async function (req, res, next) {
    const result = await db.sessions.getActiveSessions(req.currentUser.id);

    const sessions = result.map(session => ({
      id: session.id,
      created_at: session.created_at,
      is_current: session.id === req.cookies.session
    }));

    res.json({sessions});
  });

  router.post('/logout-session', async function (req, res, next) {
    await validateLogoutSession(req);

    await db.sessions.logoutSession(req.currentUser.id, req.body.id);

    res.end();
  });

  return router;
};

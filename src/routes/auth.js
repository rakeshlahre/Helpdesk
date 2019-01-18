const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const config = require('config');
const db = require('../db');
const helpers = require('../helpers');
const mw = require('../middleware');

const {
  validateLoginData,
  validateRegister
} = require('./validators/authValidators');

const milliSecondsInYear = 31536000000;

const createSession = async function (res, userId, ip, fingerprint) {
  const session = await db.sessions.createSession(userId, '365 days', ip, fingerprint);

  res.cookie('session', session.id,
    {
      maxAge: milliSecondsInYear,
      secure: config.get('SESSION_COOKIE_SECURE'),
      httpOnly: false
    });
};

module.exports = () => {
  router.post('/login', async function (req, res, next) {
    await validateLoginData(req);

    const user = await db.users.getUserByName(req.body.username);

    if (!user) {
      return res.status(401).json({error: 'Login failed'});
    }

    // Check for password
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

    const isLoginSuccessful = isPasswordCorrect;

    if (!isLoginSuccessful) {
      return res.status(401).json({error: 'Login failed'});
    }

    await createSession(res, user.id, helpers.getIp(req), helpers.getFingerPrint(req));

    res.json({
      id: user.id,
      username: user.username,
      dateJoined: user.date_joined
    });
  });

  router.post('/register', async function (req, res, next) {
    await validateRegister(req);

    const hash = await bcrypt.hash(req.body.password, 10);

    let user = null;

    user = await db.users.createUser(req.body.username, hash);

    if (user) {
      await createSession(res, user.id, helpers.getIp(req), helpers.getFingerPrint(req));
      
      res.json({
        id: user.id,
        username: user.username,
        dateJoined: user.date_joined,
      });
    } else {
      res.status(500)
        .end();
    }
  });

  router.post('/logout', mw.requireLoggedIn, async function (req, res, next) {
    await db.sessions.logoutSession(req.currentUser.id, req.cookies.session);
    res.clearCookie('session');
    res.end();
  });

  return router;
};

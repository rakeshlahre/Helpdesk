const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const config = require('config');
const db = require('../db');
const helpers = require('../helpers');
const mw = require('../middleware');
const twitterAPI = require('node-twitter-api');
const request = require('request');

const {
  validateLoginData,
  validateRegister
} = require('./validators/authValidators');

const milliSecondsInYear = 31536000000;

const twitter = new twitterAPI({
  consumerKey: 'gZEMqTHgfdR5wWOmG8Lezttf3',
  consumerSecret: 'kzhka8xZuPOC68OUSjigWEMVCk6sqN62tdRMPLUqUHcFrWQpIQ',
  callback: 'http://localhost:8080/api/auth/twitter'
});

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

  router.get('/twitter', mw.requireLoggedIn, async function (req, res, next) { 
    const tokenSecret = await db.users.getRequestTokenSecret(req.currentUser.id);

    twitter.getAccessToken(req.query.oauth_token, tokenSecret, req.query.oauth_verifier, async function(error, accessToken, accessTokenSecret, results) {
      if (error) {
          console.log(error);
      } else {
        await db.users.saveAccessToken(req.currentUser.id, accessToken, accessTokenSecret, results.user_id, results.screen_name);

        res.redirect('http://localhost:8081/dashboard');
      }
    });
  });

  router.get('/twitter-login', mw.requireLoggedIn, async function (req, res, next) {
    twitter.getRequestToken(async function(error, requestToken, requestTokenSecret, results){
      if (error) {
          console.log("Error getting OAuth request token : " + JSON.stringify(error));
      } else {
          await db.users.saveRequestToken(req.currentUser.id, requestToken, requestTokenSecret);

          res.json({requestToken});      
        }
    });
  })

  return router;
};

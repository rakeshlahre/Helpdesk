const express = require('express');
const router = express.Router();
const db = require('../db');
const mw = require('../middleware');
const twitter = require('../models/twitter')();

const milliSecondsInYear = 31536000000;

module.exports = () => {

  router.get('/user_timeline', mw.requireLoggedIn, async function (req, res, next) { 
    const params = {screen_name: req.currentUser.twitter_screen_name};
    try {
      const data = await twitter.getTimeline(
        'user_timeline', 
        params, 
        req.currentUser.twitter_access_token, 
        req.currentUser.twitter_access_token_secret
      );

      res.json(data);
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }

  });

  return router;
};

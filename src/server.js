const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const expressValidator = require('express-validator');
const helmet = require('helmet');
const db = require('./db');
const cors = require('cors');
const mw = require('./middleware')
const cookieParser = require('cookie-parser');

process.on('unhandledRejection', (reason, promise) => {
  db.logs.logUnhandledRejectionError(reason, promise);
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  db.logs.logUncaughtExceptionError(err.message, err.stack);
  console.log('Uncaught Exception', err);
});

const startHttpSever = async () => {
  const app = express();
  require('./middleware-wrapper');

  // add uuid to each request
  const assignId = function (req, res, next) {
    req.id = uuid.v4();
    next();
  };

  app.use(assignId);
  app.use(cookieParser());

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8081");
    next();
  });

  app.use(cors({
    credentials: true,
    origin: ['localhost:8080', 'localhost:8081']
  }));

  app.use(helmet({frameguard: {action: 'deny'}}));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(expressValidator());

  const router = express.Router();


  app.use(mw.attachCurrentUserToRequest);

  router.use('/auth', require('./routes/auth')());
  router.use('/sessions',require('./routes/sessions')());
  router.use('/twitter', require('./routes/twitter')());

  app.use('/api', router);

  app.use(function (error, req, res, next) {
    if (error.name === 'ValidationError' && !res.headersSent) {
      return res.status(error.code).json(error.response);
    }

    const query = error.query ? error.query.toString() : null;
    const code = error.code || null;
    const source = error.DB_ERROR ? 'DB_ERROR' : 'API_ERROR';

    db.logs.logError(error.message, error.stack, req.id, req.currentUser && req.currentUser.id, source, query, code);

    console.log(source, error);

    if (!res.headersSent) {
      res.status(500).send('An error occured');
    }
  });

  server = require('http').createServer(app).listen(8080, () => {
    console.log(`server listening on port 8080`);
  });

  return server;
}

startHttpSever();
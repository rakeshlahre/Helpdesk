const express = require('express');

const startHttpSever = async () => {
  const app = express();

  server = require('http').createServer(app).listen(8080, () => {
    console.log(`server listening on port 8080`);
  });

  return server;
}

startHttpSever();
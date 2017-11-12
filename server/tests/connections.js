//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
var {url} = require('../models');
var app = require('../../app');
var http = require('http');

var apiServer;

var connection = {
  connectDb: (port, next) => {
    apiServer = http.createServer(app);
    apiServer.listen(port);
    url
      .destroy({ where: {}})
      .then((urls) => {
        next();
      });
  },
  closeConnection: (next) => {
    apiServer.close();
  }
}




module.exports = connection;

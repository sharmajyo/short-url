//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const {url} = require('../models');
const app = require('../../app');
const http = require('http');

let apiServer;

const connection = {
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

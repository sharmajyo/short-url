const should = require('should');
const url = require('../../middlewares/url');
const {connectDb, closeConnection} = require("../connections");
var PORT = 3434;

let req = {};
let res = {};

describe('middlewares/url', () => {

  before((done) => {
    connectDb(PORT, done);
  });

  after(()=> {
    closeConnection();
  });

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = { send: () => {} };
  });

  describe('getAllUrlsMw', () => {
    it('should get all records from db', (done) => {
      url.getAllUrlsMw(req, res, () => {
        req.urls.should.deepEqual([]);
        done();
      })
    })
  });

  describe('createUrlMw', () => {
    it('should create new entry', (done) => {
      req.body.url = 'http://wwww.abc.com';
      url.createUrlMw(req, res, () => {
        should.equal(req.url.longUrl, 'http://wwww.abc.com');
        done();
      })
    })
  });

  describe('getUrlMw', () => {
    it('should get record from db by id', (done) => {
      req.body.url = 'http://wwww.abc.com';
      url.getUrlMw(req, res, () => {
        should.equal(req.url.longUrl, 'http://wwww.abc.com');
        done();
      })
    })
  });

  describe('deleteUrlMw', () => {
    it('should delete record from db by id', (done) => {
      req.params.id = 12;
      url.deleteUrlMw(req, res, () => {
        should.equal(req.url, 0);
        done();
      })
    })
  });
});

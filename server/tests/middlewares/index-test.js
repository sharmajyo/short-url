const should = require('should');
const middleware = require('../../middlewares');

let req = {};
let res = {};

describe('middlewares/index', () => {

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = { send: () => {} };
  });

  describe('hasValidParamsMW', () => {
    it('should give error if url is not send', () => {
      res = {
        send: (status, data) => {
          status.should.equal(422);
          data.should.equal('url is invalid');
        }
      };
      middleware.hasValidParamsMW(req, res);
    })

    it('should give error if url is invalid', () => {
      res = {
        send: (status, data) => {
          status.should.equal(422);
          data.should.equal('url is invalid');
        }
      };
      req.body.url = 'abc';
      middleware.hasValidParamsMW(req, res);
    })

    it('should call next if url is valid', () => {
      req.body.url = 'http://www.abc.com';
      middleware.hasValidParamsMW(req, res, () => {});
    })
  })

  describe('decodeIdMw', () => {
    it('should give error if id is not provided', () => {
      res = {
        send: (status, data) => {
          status.should.equal(422);
          data.should.equal('encoded_id is null');
        }
      };
      middleware.decodeIdMw(req, res);
    })

    it('should decode the encoded id', () => {
      req.params.encoded_id = '1ty';
      middleware.decodeIdMw(req, res, () => {
        req.params.id.should.equal(1598);
      });
    })
  })

  describe('renderLongUrlMw', () => {
    it('should render long url', () => {
      req.url = { longUrl: 'http://www.abc.com' };
      res.redirect = () => {
        req.url.longUrl.should.equal('http://www.abc.com');
      };
      middleware.renderLongUrlMw(req, res);
    })
  })

  describe('returnShortUrlMw', () => {
    it('should encode id and return short url', () => {
      req.url = { id: 1598 };
      res = {
        send: (data) => {
          data.should.deepEqual({ shortUrl: 'localhost:3000/ty', encodedId: 'ty' });
        }
      };
      middleware.returnShortUrlMw(req, res);
    })
  })
});

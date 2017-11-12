var supertest = require("supertest");
var should = require("should");
var {connectDb, closeConnection} = require("../connections");
var PORT = 3434;
var API_BASE = "http://localhost:" + PORT;
var request = supertest.agent(API_BASE);
var newShortUrl;

describe('routes', () => {

  describe('api/shortUrl', () => {

    before((done) => {
      connectDb(PORT, done);
    });

    after(()=> {
      closeConnection();
    });

    describe('/GET url', () => {
      it('it should GET all Urls', (done) => {
        request
          .get('/api/shortUrl')
          .expect(200)
          .end((err, res) => {
            res.status.should.equal(200);
            res.body.should.deepEqual([]);
            done();
          });
      });
    });

    describe('/POST url', () => {
      it('it should give error for invalid url', (done) => {
        request
          .post('/api/shortUrl')
          .send({url: 'abc'})
          .expect(200)
          .end((err, res) => {
            res.status.should.equal(422);
            done();
          });
      });

      it('it should POST new url', (done) => {
        request
          .post('/api/shortUrl')
          .send({url: 'http://www.abc.com'})
          .expect(200)
          .end((err, res) => {
            newShortUrl = res.body.encodedId;
            done();
          });
      });
    });

    describe('/GET/:encoded_id url', () => {
      it('it should GET url by id', (done) => {
        request
          .delete(`/api/shortUrl/${newShortUrl}`)
          .expect(200)
          .end((err, res) => {
            res.status.should.equal(200);
            done();
          });
      });
    });

    describe('/DELETE url', () => {
      it('it should DELETE url by id', (done) => {
        request
          .delete(`/api/shortUrl/${newShortUrl}`)
          .expect(200)
          .end((err, res) => {
            res.status.should.equal(200);
            done();
          });
      });
    });
  });

  describe('/GET/:encoded_id url', () => {
    it('it should GET url by id', (done) => {
      request
        .get(`${newShortUrl}`)
        .expect(200)
        .end((err, res) => {
          done();
        });
    });
  });
});


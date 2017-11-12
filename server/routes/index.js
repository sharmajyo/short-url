const express = require('express');
const router = express.Router();
const shortUrl = require('./shortUrl');
const {
  decodeIdMw,
  renderLongUrlMw
} = require('../middlewares');
const {
  getUrlMw
} = require('../middlewares/url');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { data: 'Short url' });
});

router.get('/error', (req, res, next) => {
  res.render('error');
});

router.get('/:encoded_id', [
  decodeIdMw,
  getUrlMw,
  renderLongUrlMw
]);

router.use('/api/shortUrl', shortUrl)

module.exports = router;

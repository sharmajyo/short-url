const express = require('express');
const router = express.Router();
const {
  hasValidParamsMW,
  decodeIdMw,
  renderLongUrlMw,
  returnShortUrlMw,
} = require('../middlewares');
const {
  createUrlMw,
  getAllUrlsMw,
  getUrlMw,
  deleteUrlMw
} = require('../middlewares/url');

router.get('/', [
  getAllUrlsMw,
  (req, res, next) => {
    res.send(req.urls);
  }
]);

router.post('/', [
  hasValidParamsMW,
  getUrlMw,
  (req, res, next) => {
    if(req.url) {
      return returnShortUrlMw(req, res, next);
    }
    next();
  },
  createUrlMw,
  returnShortUrlMw
]);

router.get('/:encoded_id', [
  decodeIdMw,
  getUrlMw,
  returnShortUrlMw
]);

router.delete('/:encoded_id', [
  decodeIdMw,
  deleteUrlMw,
  returnShortUrlMw
]);

module.exports = router;

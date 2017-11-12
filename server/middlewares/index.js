const validUrl = require('valid-url');
const {encode, decode} = require('../utils/base58');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.json')[env];

const hasValidParamsMW = (req, res, next) => {
  if (!req.body.url || !validUrl.isUri(req.body.url)) {
    return res.send(422, 'url is invalid');
  }
  next();
}

const decodeIdMw = (req, res, next) => {
  if(!req.params.encoded_id) {
    return res.send(422, 'encoded_id is null');
  }
  req.params.id = decode(req.params.encoded_id);
  next();
}

const renderLongUrlMw = (req, res, next) => {
  res.redirect(req.url.longUrl);
}

const returnShortUrlMw = (req, res, next) => {
  encodedId = encode(req.url.id);
  shortUrl = config.appUrl + encodedId;
  res.send({ shortUrl, encodedId });
}

module.exports = { hasValidParamsMW, decodeIdMw, renderLongUrlMw, returnShortUrlMw };

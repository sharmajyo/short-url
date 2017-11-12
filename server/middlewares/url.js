const {url} = require('../models');
const sequelize = require('sequelize');

const getAllUrlsMw = (req, res, next) => {
  url
    .findAll()
    .then((urls) => {
      req.urls = urls;
      next();
    })
    .catch((e) => {
      res.render('error', {message: 'error in fetching records'});
    });
}

const getUrlMw = (req, res, next) => {
  url
    .findOne(
      { where: sequelize.or({ id: req.params.id}, {longUrl: req.body.url }) }
    )
    .then((url) => {
      req.url = url;
      next();
    })
    .catch((e) => {
      res.render('error', {message: 'error in fetching record'});
    });
}

const createUrlMw = (req, res, next) => {
  url
    .create(
      { longUrl: req.body.url }
    )
    .then((url) => {
      req.url = url;
      next();
    })
    .catch((e) => {
      res.render('error', {message: 'error in saving record'});
    });
}

const deleteUrlMw = (req, res, next) => {
  url
    .destroy(
      { where: { id: req.params.id } }
    )
    .then((url) => {
      req.url = url;
      next();
    })
    .catch(() => {
      res.render('error', {message: 'error in deleting record'});
    });
}

module.exports = { getAllUrlsMw, getUrlMw, createUrlMw, deleteUrlMw };

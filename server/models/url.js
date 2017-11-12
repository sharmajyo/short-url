'use strict';
module.exports = (sequelize, DataTypes) => {
  var url = sequelize.define('url', {
    longUrl: DataTypes.STRING
  });
  return url;
};

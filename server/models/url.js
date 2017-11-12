'use strict';
module.exports = (sequelize, DataTypes) => {
  const url = sequelize.define('url', {
    longUrl: DataTypes.STRING
  });
  return url;
};

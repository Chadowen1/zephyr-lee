'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LogementEtranger extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  LogementEtranger.init({
    Titre: DataTypes.STRING,
    Description: DataTypes.STRING,
    Prix: DataTypes.DECIMAL,
    Type: DataTypes.STRING,
    Localisation: DataTypes.STRING,
    ProprietaireID: DataTypes.INTEGER,
    ExpatrierID: DataTypes.INTEGER,
    ConseilsAdmin: DataTypes.TEXT,
    Status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'LogementEtranger',
  });

  return LogementEtranger;
};
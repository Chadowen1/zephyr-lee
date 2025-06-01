'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LogementEtrangerID extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  LogementEtrangerID.init({
    Time: DataTypes.STRING,
    Description: DataTypes.TEXT,
    Usage: DataTypes.DECIMAL,
    Localisation: DataTypes.STRING,
    ProprietarieID: DataTypes.INTEGER,
    EcpartieID: DataTypes.INTEGER,
    ConseilsAdmin: DataTypes.TEXT,
    Statut: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'LogementEtrangerID',
  });

  return LogementEtrangerID;
};
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UtilityUserID extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  UtilityUserID.init({
    UtilityUserID: DataTypes.INTEGER,
    CibleID: DataTypes.INTEGER,
    TypeCible: DataTypes.STRING,
    Note: DataTypes.INTEGER,
    Commentaire: DataTypes.TEXT,
    Date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'UtilityUserID',
  });

  return UtilityUserID;
};
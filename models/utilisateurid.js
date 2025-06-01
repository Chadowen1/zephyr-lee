'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UtilisateurID extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  UtilisateurID.init({
    UtilisateurID: DataTypes.INTEGER,
    CibleID: DataTypes.INTEGER,
    TypeCible: DataTypes.STRING,
    Note: DataTypes.INTEGER,
    Commentaire: DataTypes.TEXT,
    Date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'UtilisateurID',
  });

  return UtilisateurID;
};
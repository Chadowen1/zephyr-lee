'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transporteur extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  Transporteur.init({
    UtilisateurID: DataTypes.INTEGER,
    CibleID: DataTypes.INTEGER,
    TypeCible: DataTypes.STRING,
    Note: DataTypes.INTEGER,
    Commentaire: DataTypes.TEXT,
    Date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Transporteur',
    tableName: 'Transporteur',
  });

  return Transporteur;
};
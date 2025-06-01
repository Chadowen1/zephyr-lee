'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TransporteurID extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  TransporteurID.init({
    ExpediteurID: DataTypes.INTEGER,
    DestinataireID: DataTypes.INTEGER,
    TransporteurID: DataTypes.INTEGER,
    Poids: DataTypes.DECIMAL,
    Tarif: DataTypes.DECIMAL,
    Assurance: DataTypes.BOOLEAN,
    Suivi: DataTypes.JSON,
    Statut: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'TransporteurID',
  });

  return TransporteurID;
};
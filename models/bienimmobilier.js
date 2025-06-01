'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BienImmobilier extends Model {
    static associate(models) {
      // Define associations here
      BienImmobilier.belongsTo(models.Utilisateur, {
        foreignKey: 'ProprietarieID',
        as: 'Proprietaire',
      });
    }
  }

  BienImmobilier.init(
    {
      Titre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      Prix: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      Localisation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ProprietarieID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Statut: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Available',
      },
    },
    {
      sequelize,
      modelName: 'BienImmobilier',
      tableName: 'BienImmobiliers',
      timestamps: true,
    }
  );

  return BienImmobilier;
};
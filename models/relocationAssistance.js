'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RelocationAssistance extends Model {
    static associate(models) {
      RelocationAssistance.belongsTo(models.Utilisateur, {
        foreignKey: 'user_id',
        as: 'Utilisateur',
      });
    }
  }

  RelocationAssistance.init(
    {
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      services_offered: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      contact_info: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'RelocationAssistance',
      tableName: 'RelocationAssistances',
      timestamps: true,
    }
  );

  return RelocationAssistance;
};
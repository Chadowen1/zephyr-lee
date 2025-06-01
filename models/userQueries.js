'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserQueries extends Model {
    static associate(models) {
      UserQueries.belongsTo(models.Utilisateur, {
        foreignKey: 'user_id',
        as: 'Utilisateur',
      });
    }
  }

  UserQueries.init(
    {
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      question: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'UserQueries',
      tableName: 'UserQueries',
      timestamps: true,
    }
  );

  return UserQueries;
};
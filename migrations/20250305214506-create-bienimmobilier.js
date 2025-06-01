'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BienImmobiliers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Time: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      Prix: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      Localisation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ProprietarieID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Utilisateurs', // References the Utilisateurs table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      VisiteVirulence: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      Statut: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BienImmobiliers');
  },
};
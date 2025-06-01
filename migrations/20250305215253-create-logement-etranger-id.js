'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LogementEtrangerIDs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Time: {
        type: Sequelize.STRING
      },
      Description: {
        type: Sequelize.TEXT
      },
      Usage: {
        type: Sequelize.DECIMAL
      },
      Localisation: {
        type: Sequelize.STRING
      },
      ProprietarieID: {
        type: Sequelize.INTEGER
      },
      EcpartieID: {
        type: Sequelize.INTEGER
      },
      ConseilsAdmin: {
        type: Sequelize.TEXT
      },
      Statut: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('LogementEtrangerIDs');
  }
};
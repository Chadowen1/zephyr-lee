'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LogementEtrangers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Titre: {
        type: Sequelize.STRING
      },
      Description: {
        type: Sequelize.STRING
      },
      Loyer: {
        type: Sequelize.DECIMAL
      },
      ProprietaireID: {
        type: Sequelize.INTEGER
      },
      ExpatrierID: {
        type: Sequelize.INTEGER
      },
      ConseilsAdmin: {
        type: Sequelize.TEXT
      },
      Status: {
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
    await queryInterface.dropTable('LogementEtrangers');
  }
};
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UtilityUserIDs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UtilityUserID: {
        type: Sequelize.INTEGER
      },
      CibleID: {
        type: Sequelize.INTEGER
      },
      TypeCible: {
        type: Sequelize.STRING
      },
      Note: {
        type: Sequelize.INTEGER
      },
      Commentaire: {
        type: Sequelize.TEXT
      },
      Date: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('UtilityUserIDs');
  }
};
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TransporteurIDs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ExpediteurID: {
        type: Sequelize.INTEGER
      },
      DestinataireID: {
        type: Sequelize.INTEGER
      },
      TransporteurID: {
        type: Sequelize.INTEGER
      },
      Poids: {
        type: Sequelize.DECIMAL
      },
      Tarif: {
        type: Sequelize.DECIMAL
      },
      Assurance: {
        type: Sequelize.BOOLEAN
      },
      Suivi: {
        type: Sequelize.JSON
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
    await queryInterface.dropTable('TransporteurIDs');
  }
};
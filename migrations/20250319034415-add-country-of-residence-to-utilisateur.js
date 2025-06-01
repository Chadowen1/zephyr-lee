'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Utilisateurs', 'country_of_residence', {
      type: Sequelize.STRING,
      allowNull: true, // Optional field
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Utilisateurs', 'country_of_residence');
  },
};
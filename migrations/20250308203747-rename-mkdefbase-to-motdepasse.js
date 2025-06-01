'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Rename the column from `MkDeFBase` to `MotDePasse`
    await queryInterface.renameColumn('utilisateurs', 'MkDeFBase', 'MotDePasse');
  },

  async down(queryInterface, Sequelize) {
    // Revert the column name back to `MkDeFBase`
    await queryInterface.renameColumn('utilisateurs', 'MotDePasse', 'MkDeFBase');
  },
};
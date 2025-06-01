'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex('Utilisateurs', ['Email'], { unique: true });
    await queryInterface.addIndex('BienImmobiliers', ['ProprietarieID']);
    await queryInterface.addIndex('LogementEtrangers', ['Pays']);
    await queryInterface.addIndex('Transporteurs', ['ServicePays']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('Utilisateurs', ['Email']);
    await queryInterface.removeIndex('BienImmobiliers', ['ProprietarieID']);
    await queryInterface.removeIndex('LogementEtrangers', ['Pays']);
    await queryInterface.removeIndex('Transporteurs', ['ServicePays']);
  }
};
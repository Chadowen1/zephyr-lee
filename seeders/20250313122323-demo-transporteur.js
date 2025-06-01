'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('transporteur', [ 
      {
        UtilisateurID: 1,
        CibleID: 1,
        TypeCible: 'Client',
        Note: 5,
        Commentaire: 'Excellent service!',
        Date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        UtilisateurID: 2,
        CibleID: 2,
        TypeCible: 'Fournisseur',
        Note: 4,
        Commentaire: 'Très bon transporteur.',
        Date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('transporteur', null, {}); 
  }
};
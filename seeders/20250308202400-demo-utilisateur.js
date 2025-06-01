'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('utilisateurs', [
      {
        Nom: 'John Doe',
        Email: 'john@example.com',
        MotDePasse: 'password123',
        Role: 'Admin',
        Adress: '123 Main St',
        Telephone: '23-123-123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Nom: 'Jane Smith',
        Email: 'jane@example.com',
        MotDePasse: 'password456',
        Role: 'User',
        Adress: '456 Elm St',
        Telephone: '44-555-666',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('utilisateurs', null, {});
  },
};
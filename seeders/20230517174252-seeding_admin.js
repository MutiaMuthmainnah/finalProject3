'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users',[{
      full_name: 'admin',
      password: 'kelompok1',
      gender: 'male',
      email: 'admin@tokobelanja.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],{});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

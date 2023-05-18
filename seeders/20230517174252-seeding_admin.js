"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          full_name: "Admin",
          email: "admin@tokobelanja.com",
          password: await hashPassword("kelompok1"),
          gender: "male",
          role: "admin",
          balance: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "Users",
      { email: "admin@tokobelanja.com" },
      {}
    );
  },
};

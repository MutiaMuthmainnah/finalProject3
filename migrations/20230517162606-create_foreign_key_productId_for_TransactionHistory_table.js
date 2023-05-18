"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("TransactionHistories", "ProductId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Products",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("TransactionHistories", "ProductId");
  },
};

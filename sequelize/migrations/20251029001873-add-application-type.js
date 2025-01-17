"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("categories", "application_type", {
      type: Sequelize.STRING,
      allowNull: true, // Or false, depending on your requirements
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("categories", "application_type");
  },
};
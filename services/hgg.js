"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("applications", "application_category", {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn("applications", "application_type", {
      type: Sequelize.STRING,
    });
  },
  async down(queryInterface, ) {
    await queryInterface.removeColumn("applications", "application_category");
    await queryInterface.removeColumn("applications", "application_type");
  },
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('classifications', 'form_type', {
      type: Sequelize.STRING,
      allowNull: true, // Allow NULL values
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('classifications', 'form_type', {
      type: Sequelize.STRING,
      allowNull: false, // Revert to NOT NULL
    });
  }
};

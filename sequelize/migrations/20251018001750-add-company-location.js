'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'company_location', {
      type: Sequelize.STRING,
      allowNull: true, // Or false, depending on your requirements
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'company_location');
  }
};
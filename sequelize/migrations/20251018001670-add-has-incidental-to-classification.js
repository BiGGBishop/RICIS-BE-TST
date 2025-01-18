'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('classifications', 'has_incidental', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: true, // Or false, depending on your requirements
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('classifications', 'has_incidental');
  }
};
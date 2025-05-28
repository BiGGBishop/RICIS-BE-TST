'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('AuthorizationManufacturers', 'form_name', {
      type: Sequelize.TEXT, // Adjust as needed
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('AuthorizationManufacturers', 'form_name');
  }
};

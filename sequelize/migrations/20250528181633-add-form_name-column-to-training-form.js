'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('TrainingOrganizationForm', 'form_name', {
      type: Sequelize.STRING, // Adjust as needed
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('TrainingOrganizationForm', 'form_name');
  }
};

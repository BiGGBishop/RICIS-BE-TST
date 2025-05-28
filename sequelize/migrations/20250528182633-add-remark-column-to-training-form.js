'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('TrainingOrganizationForm', 'remark', {
      type: Sequelize.TEXT, // Adjust as needed
      allowNull: true
    });
    
    await queryInterface.addColumn('TrainingOrganizationForm', 'feedback', {
      type: Sequelize.TEXT, // Adjust as needed
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('TrainingOrganizationForm', 'remark');
    await queryInterface.removeColumn('TrainingOrganizationForm', 'feedback');
  }
};

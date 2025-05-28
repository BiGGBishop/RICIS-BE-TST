'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('CompetencyCertificationFormBoiler', 'training_organization_approval', {
      type: Sequelize.STRING, // Adjust as needed
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('CompetencyCertificationFormBoiler', 'training_organization_approval');
  }
};

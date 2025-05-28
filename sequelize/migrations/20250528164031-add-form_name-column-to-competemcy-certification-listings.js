'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('CompetencyCertificationLiftings', 'form_name', {
      type: Sequelize.STRING, // Adjust as needed
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('CompetencyCertificationLiftings', 'form_name');
  }
};

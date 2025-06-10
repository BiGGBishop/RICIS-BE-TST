'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'CompetencyCertificationFormLiftOperator',
      'training_start_date',
      {
        type: Sequelize.DATE,
        allowNull: true, // Set to false if you require the field
      }
    );

    await queryInterface.addColumn(
      'CompetencyCertificationFormLiftOperator',
      'training_completion_date',
      {
        type: Sequelize.DATE,
        allowNull: true,
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'CompetencyCertificationFormLiftOperator',
      'training_start_date'
    );

    await queryInterface.removeColumn(
      'CompetencyCertificationFormLiftOperator',
      'training_completion_date'
    );
  }
};

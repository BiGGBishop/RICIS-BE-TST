'use strict';

const tables = [
  'ApprovedInspectionAgencies',
  'OperatorCertifications',
  'ManufacturerRepairers',
  'boiler_registrations',
  'AuthorizationApproveds',
  'CompetencyCertificationWelders',
  'LiftingEquipmentRegistrations',
  'AuthorizedInspectorCertifications',
  'CompetencyCertificationFormBoiler',
  'CompetencyCertificationFormLiftOperator',
  'CompetencyCertificationLiftings',
  'AuthorizationManufacturers',
  'TrainingOrganizationForm',
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (const table of tables) {
      await queryInterface.addColumn(table, 'incidentalFees', {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
        after: 'id', // Optional, if your dialect (like MySQL) supports it
      });
      await queryInterface.addColumn(table, 'statutoryFees', {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
        after: 'incidentalFees', // Optional
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    for (const table of tables) {
      await queryInterface.removeColumn(table, 'incidentalFees');
      await queryInterface.removeColumn(table, 'statutoryFees');
    }
  },
};

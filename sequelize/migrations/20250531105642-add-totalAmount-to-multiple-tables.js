'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
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
      'TrainingOrganizationForms',
    ];

    for (const table of tables) {
      await queryInterface.addColumn(table, 'totalAmount', {
        type: Sequelize.DECIMAL(10, 2), // Use DECIMAL for currency (adjust as needed)
        allowNull: true,
        defaultValue: 0.00,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
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
      'TrainingOrganizationForms',
    ];

    for (const table of tables) {
      await queryInterface.removeColumn(table, 'totalAmount');
    }
  }
};

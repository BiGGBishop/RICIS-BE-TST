'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
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
    ];

    for (const table of tables) {
      await queryInterface.addColumn(table, 'incidentalIds', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
  },

  async down(queryInterface, Sequelize) {
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
    ];

    for (const table of tables) {
      await queryInterface.removeColumn(table, 'incidentalIds');
    }
  },
};
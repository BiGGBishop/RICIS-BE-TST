'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tables = [
      "AuthorizationManufacturers",
      "ManufacturerRepairers",
      "OperatorCertifications",
      "RenewalForms",
      "LiftingEquipmentRegistrations",
      "CompetencyCertificationFormLiftOperator"
    ];

    for (const table of tables) {
      await queryInterface.addColumn(table, "remark", {
        type: Sequelize.TEXT,
        allowNull: true,
      });
      await queryInterface.addColumn(table, "feedback", {
        type: Sequelize.TEXT,
        allowNull: true,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const tables = [
        "TrainingOrganizationForm",
        "ApprovedInspectionAgencies",
        "CompetencyCertificationForm",
        "boiler_registrations",
        "ManufacturerRepairers",
        "OperatorCertifications",
        "RenewalForms",
        "LiftingEquipmentRegistrations",
        "CompetencyCertificationFormLiftOperator"
      ];
    for (const table of tables) {
      await queryInterface.removeColumn(table, "remark");
      await queryInterface.removeColumn(table, "feedback");
    }
  },
};
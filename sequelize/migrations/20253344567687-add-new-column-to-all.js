'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

 
    await queryInterface.addColumn("ManufacturerRepairers", "form_name", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("OperatorCertifications", "form_name", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("RenewalForms", "form_name", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("LiftingEquipmentRegistrations", "form_name", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("CompetencyCertificationFormLiftOperator", "form_name", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("CompetencyCertificationFormBoiler", "form_name", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("TrainingOrganizationForm", "form_name");
    await queryInterface.removeColumn("ApprovedInspectionAgencies", "form_name");
    await queryInterface.removeColumn("CompetencyCertificationForm", "form_name");
    await queryInterface.removeColumn("boiler_registrations", "form_name");
    await queryInterface.removeColumn("ManufacturerRepairers", "form_name");
    await queryInterface.removeColumn("OperatorCertifications", "form_name");
    await queryInterface.removeColumn("RenewalForms", "form_name");
    await queryInterface.removeColumn("LiftingEquipmentRegistrations", "form_name");
    await queryInterface.removeColumn("CompetencyCertificationFormLiftOperator", "form_name");
    await queryInterface.removeColumn("CompetencyCertificationFormBoiler", "form_name");
  }
};
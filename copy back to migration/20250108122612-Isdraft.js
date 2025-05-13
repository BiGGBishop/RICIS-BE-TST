'use strict';

const { defaultValueSchemable } = require('sequelize/lib/utils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// await queryInterface.addColumn("TrainingOrganizationForm", "is_draft", {
		// 	type: Sequelize.BOOLEAN,
		// 	defaultValue: false,
		// 	// allowNull: false, // Adjust based on your requirements
    // });
    
    // await queryInterface.addColumn("ApprovedInspectionAgencies", "is_draft", {
    //   type: Sequelize.BOOLEAN,
    //   defaultValue: false
    // });

    // await queryInterface.addColumn("CompetencyCertificationForm", "is_draft", {
    //   type: Sequelize.BOOLEAN,
    //   defaultValue: false
    // });

    // await queryInterface.addColumn("boiler_registrations", "is_draft", {
		// 	type: Sequelize.BOOLEAN,
		// 	defaultValue: false,
    // });
    
    // await queryInterface.addColumn("ManufacturerRepairers", "is_draft", {
		// 	type: Sequelize.BOOLEAN,
		// 	defaultValue: false,
    // });

    // await queryInterface.addColumn("OperatorCertifications", "is_draft", {
		// 	type: Sequelize.BOOLEAN,
		// 	defaultValue: false,
    // });
    
    // await queryInterface.addColumn("RenewalForms", "is_draft", {
		// 	type: Sequelize.BOOLEAN,
		// 	defaultValue: false,
		// });
	},

	async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("boiler_registrations", "is_draft");
    await queryInterface.removeColumn("RenewalForms", "is_draft");
    await queryInterface.removeColumn("OperatorCertifications", "is_draft");
    await queryInterface.removeColumn("ManufacturerRepairers", "is_draft");
    await queryInterface.removeColumn("CompetencyCertificationForm", "is_draft");
    await queryInterface.removeColumn("ApprovedInspectionAgencies", "is_draft");
    await queryInterface.removeColumn("ApprovedInspectionAgencies", "is_draft");
    await queryInterface.removeColumn("TrainingOrganizationForm", "is_draft");
	},
};

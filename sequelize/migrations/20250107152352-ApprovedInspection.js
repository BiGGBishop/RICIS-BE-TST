"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("ApprovedInspectionAgencies", {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			userId: {
				type: Sequelize.INTEGER,
				references: {
					model: "users", // Name of the referenced table
					key: "id",
				},
				onDelete: "SET NULL",
				allowNull: true,
			},
			// Application Information
			date_received: Sequelize.DATE,
			form_number: Sequelize.STRING,
			form_type: Sequelize.STRING,
			boiler_pressure_vessel_category: Sequelize.STRING,
			type_of_service: Sequelize.ENUM("Nuclear", "Non-Nuclear"),
			service_classification: Sequelize.ARRAY(Sequelize.STRING),
			lifting_equipment_category: Sequelize.STRING,
			lifting_service_classification: Sequelize.ARRAY(Sequelize.STRING),
			application_type: Sequelize.ENUM("New Application", "Re-Application"),
			documentation_available: Sequelize.BOOLEAN,
			exemption_requested: Sequelize.BOOLEAN,

			// Company Information
			company_name: Sequelize.STRING,
			physical_address: Sequelize.TEXT,
			cac_registration_number: Sequelize.STRING,
			year_commencing_business: Sequelize.INTEGER,
			number_of_employees: Sequelize.INTEGER,
			membership_nagobin: Sequelize.BOOLEAN,
			membership_leia: Sequelize.BOOLEAN,
			other_professional_bodies: Sequelize.ARRAY(Sequelize.STRING),
			quality_certifications: Sequelize.ARRAY(Sequelize.STRING),
			competence_category: Sequelize.STRING,
			competence_line_number: Sequelize.STRING,
			incidental_line_number: Sequelize.STRING,
			contact_person: Sequelize.STRING,
			contact_telephone: Sequelize.STRING,
			contact_email: Sequelize.STRING,

			// Prospective Supervisor / Technical Manager
			supervisor_name: Sequelize.STRING,
			supervisor_address: Sequelize.TEXT,
			supervisor_date_of_birth: Sequelize.DATE,
			supervisor_email: Sequelize.STRING,
			supervisor_telephone: Sequelize.STRING,
			supervisor_education: Sequelize.ARRAY(Sequelize.JSONB),
			supervisor_professional_qualifications: Sequelize.ARRAY(Sequelize.JSONB),
			supervisor_experience: Sequelize.ARRAY(Sequelize.JSONB),

			// Approved Inspector
			inspector_name: Sequelize.STRING,
			inspector_address: Sequelize.TEXT,
			inspector_date_of_birth: Sequelize.DATE,
			inspector_email: Sequelize.STRING,
			inspector_telephone: Sequelize.STRING,
			inspector_education: Sequelize.ARRAY(Sequelize.JSONB),
			inspector_professional_qualifications: Sequelize.ARRAY(Sequelize.JSONB),
			inspector_experience: Sequelize.ARRAY(Sequelize.JSONB),

			// Declaration
			responsible_charge: Sequelize.STRING,
			declaration_date: Sequelize.DATE,

			// Official Use
			applicant_declarationname: Sequelize.STRING,
			applicant_declaration_date: Sequelize.DATE,
			application_status: Sequelize.STRING,
			authorization_number: Sequelize.STRING,
			director_facto: Sequelize.STRING,
			director_signature: Sequelize.STRING,
			director_signature_date: Sequelize.DATE,
			approval_category: Sequelize.STRING,
			approval_class: Sequelize.STRING,

			// Documents Uploaded
			documents_uploaded: Sequelize.ARRAY(Sequelize.STRING),

			// Timestamps
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("ApprovedInspectionAgencies");
	},
};

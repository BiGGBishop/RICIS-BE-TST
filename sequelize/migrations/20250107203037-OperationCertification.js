"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("OperatorCertifications", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
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
			certification_type: {
				type: Sequelize.ENUM(
					"Lifting Equipment Operator",
					"Lifting Equipment Operator Assistance",
					"Forklift Operator",
					"Passenger Lift Technician"
				),
			},
			certification_class: {
				type: Sequelize.ENUM(
					"Below 50 tons",
					"51 – 100 tons",
					"Above 100 tons"
				),
			},
			application_type: {
				type: Sequelize.ENUM("New Application", "Re-Application"),
			},
			documentation_available: Sequelize.BOOLEAN,
			exemption_requested: Sequelize.BOOLEAN,

			// Training Information
			training_start_date: Sequelize.DATE,
			training_completion_date: Sequelize.DATE,
			training_method: {
				type: Sequelize.ENUM("Online", "Classroom", "Field"),
			},
			training_organization_name: Sequelize.STRING,
			training_organization_registration_number: Sequelize.STRING,
			training_organization_location: Sequelize.STRING,
			training_organization_quality_certifications: {
				type: Sequelize.ARRAY(Sequelize.STRING),
			},
			training_organization_contact_person: Sequelize.STRING,
			training_organization_contact_email: Sequelize.STRING,
			training_organization_contact_phone: Sequelize.STRING,

			// Employer Information
			employer_name: Sequelize.STRING,
			employer_address: Sequelize.TEXT,
			employer_quality_certifications: {
				type: Sequelize.ARRAY(Sequelize.STRING),
			},
			employer_contact_person: Sequelize.STRING,
			employer_contact_phone: Sequelize.STRING,
			employer_contact_email: Sequelize.STRING,

			// Applicant Information
			applicant_name: Sequelize.STRING,
			applicant_address: Sequelize.TEXT,
			applicant_date_of_birth: Sequelize.DATE,
			applicant_email: Sequelize.STRING,
			applicant_phone: Sequelize.STRING,
			competence_category: Sequelize.STRING,
			competence_line_number: Sequelize.STRING,
			incidental_line_number: Sequelize.STRING,

			// Education
			education_details: Sequelize.ARRAY(Sequelize.JSONB),

			// Professional Qualification
			professional_qualifications: Sequelize.ARRAY(Sequelize.JSONB),

			// Experience
			experience_details: Sequelize.ARRAY(Sequelize.JSONB),

			// Declaration
			applicant_declaration_name: Sequelize.STRING,
			applicant_declaration_date: Sequelize.DATE,
			responsible_charge: Sequelize.STRING,
			declaration_date: Sequelize.DATE,

			// Official Use
			exam_registration_number: Sequelize.STRING,
			certification_class_accepted: Sequelize.STRING,
			director_of_factories: Sequelize.STRING,
			director_signature_date: Sequelize.DATE,

			// Uploaded Documents
			uploaded_documents: Sequelize.ARRAY(Sequelize.STRING),

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

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("OperatorCertifications");
	},
};

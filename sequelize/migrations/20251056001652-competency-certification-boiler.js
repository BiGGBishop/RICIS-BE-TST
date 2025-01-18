"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("CompetencyCertificationFormBoiler", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				type: Sequelize.INTEGER,
				references: {
					model: "users", // Name of the users table
					key: "id",
				},
				onDelete: "SET NULL",
				allowNull: true,
			},
			categoryId:{
				type: Sequelize.INTEGER,
				allowNull: false, 
				references: {
				  model: 'categories',
				  key: 'id',
				},
				onDelete: 'SET NULL',	
			},
			subcategoryId:{
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'subcategories',
					key: 'id',
				},
				onDelete: 'SET NULL',
				
			},
			classificationId:{
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
				  model: 'classifications',
				  key: 'id',
				},
				onDelete: 'SET NULL',
			},
			feeId:{
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'fees',
					key: 'id',
				},
				onDelete: 'SET NULL',
			},
			date_received: {
				type: Sequelize.DATE,
				allowNull:true,
			},
			form_type: {
				type: Sequelize.STRING,
			},
      certification_type: {
				type: Sequelize.ENUM(
					"Power Engineer",
					"Refrigeration Engineer",
          "Power Technician",
          "Refrigeration Technician",
          "Design Engineer",
          "Welding Engineer"
				),
			},
      certification_class: {
				type: Sequelize.ENUM(
					"Class 1",
					"Class 2",
					"Class 3"
				),
			},
			technical_authority: {
				type: Sequelize.BOOLEAN,
			},
			appointed_person: {
				type: Sequelize.BOOLEAN,
			},
			approved_person: {
				type: Sequelize.BOOLEAN,
			},
			category_of_class:{
				type: Sequelize.ENUM(
					"Class A",
					"Class B",
					"Class C",
					"Class D",
					"Class E",
				)
			},
			new_application: {
				type: Sequelize.BOOLEAN,
			},
			re_application: {
				type: Sequelize.BOOLEAN,
			},
			training_start_date: {
				type: Sequelize.DATE,
			},
			training_completion_date: {
				type: Sequelize.DATE,
			},
			documentation_available_for_review: {
				type: Sequelize.BOOLEAN,
			},
			exemption_requested: {
				type: Sequelize.BOOLEAN,
			},
			employer_name: {
				type: Sequelize.STRING,
			},
			employer_physical_address: {
				type: Sequelize.TEXT,
			},
			employer_authorization_number: {
				type: Sequelize.STRING,
			},
			employer_contact_person: {
				type: Sequelize.STRING,
			},
			employer_contact_telephone: {
				type: Sequelize.STRING,
			},
			employer_contact_email_address: {
				type: Sequelize.STRING,
			},
			employer_quality_certifications: {
				type: Sequelize.ARRAY(Sequelize.STRING),
			},
			training_organization_name: {
				type: Sequelize.STRING,
			},
      training_method: {
				type: Sequelize.ENUM("Online", "Classroom", "Field"),
			},
			training_organization_approval_number: {
				type: Sequelize.STRING,
			},
			training_facility_location: {
				type: Sequelize.STRING,
			},
			training_organization_quality_certifications: {
				type: Sequelize.ARRAY(Sequelize.STRING),
			},
			training_organization_contact_person: {
				type: Sequelize.STRING,
			},
			training_organization_telephone: {
				type: Sequelize.STRING,
			},
			training_organization_email: {
				type: Sequelize.STRING,
			},
			applicant_name: {
				type: Sequelize.STRING,
			},
			applicant_address: {
				type: Sequelize.TEXT,
			},
			applicant_date_of_birth: {
				type: Sequelize.DATE,
			},
			applicant_email_address: {
				type: Sequelize.STRING,
			},
			applicant_telephone_number: {
				type: Sequelize.STRING,
			},
			competence_category: {
				type: Sequelize.STRING,
			},
			competence_line_number: {
				type: Sequelize.STRING,
			},
			incidental_line_number: {
				type: Sequelize.STRING,
			},
			high_school: {
				type: Sequelize.JSONB,
			},
			polytechnic: {
				type: Sequelize.JSONB,
			},
			university: {
				type: Sequelize.JSONB,
			},
			professional_qualification: {
				type: Sequelize.JSONB,
			},
			experience: {
				type: Sequelize.JSONB,
			},
			applicant_declaration_name: {
				type: Sequelize.STRING,
			},
			applicant_declaration_date: {
				type: Sequelize.DATE,
			},
			employer_responsible_charge_name: {
				type: Sequelize.STRING,
			},
			employer_responsible_charge_date: {
				type: Sequelize.DATE,
			},
      exam_registration_number: {
				type: Sequelize.STRING,
			},
      director_of_factories: {
				type: Sequelize.STRING,
			},
      director_signature_date: {
				type: Sequelize.DATE,
			},
      uploaded_documents: {
				type: Sequelize.ARRAY(Sequelize.STRING),
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("CompetencyCertificationFormBoiler");
	},
};
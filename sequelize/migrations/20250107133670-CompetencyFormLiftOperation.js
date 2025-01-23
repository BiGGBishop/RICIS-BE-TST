"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("CompetencyCertificationFormLiftOperator", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},

			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			  },
			  categoryId: Sequelize.INTEGER,
			  subcategoryId: Sequelize.INTEGER,
			  classificationId: Sequelize.INTEGER,

			  feeId:{
						type: Sequelize.INTEGER,
						allowNull: false,
						references: {
							model: 'fees',
							key: 'id',
						},
						onDelete: 'SET NULL',            
					},
			  paymentStatus: {
				type: Sequelize.ENUM("unpaid", "paid"),
				defaultValue:"unpaid"
			   
			  },
			  type_of_certification:{
				type: Sequelize.ENUM("Technical Authority", "Appointed Person", "Approved Person"),
				defaultValue:"Technical Authority"
			  },
			appStatus: {
				type: Sequelize.ENUM("pending", "approved", "rejected", "suspended"),
				defaultValue:"pending"
			   
			  },
			  form_number: {
				type: Sequelize.STRING,
				allowNull: true,
			  },
			  category_of_certification: {
				type: Sequelize.ENUM(
				  "Class A",
				  "Class B",
				  "Class C",
				  "Class D",
				 "Class E",
				  "Class F",
				  "Class G"
				),
				defaultValue:"Class A"
			   
			  },
			  application_type: {
				type: Sequelize.ENUM("New Application","Re-application"),
				allowNull:"New Application"
			   
			  },
			  available_for_documentation_review: {
				type: Sequelize.BOOLEAN,
				allowNull: true,
			  },
			  exemption_request: {
				type: Sequelize.BOOLEAN,
				allowNull: true,
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
			  employer_quality_certifications: {
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
			  training_organization_name: {
				type: Sequelize.STRING,
			  },
			  training_method: {
				type: Sequelize.ENUM("Online", "Class Room", "Field"),
				defaultValue:"Online"
			  },
			  training_organization_registration_number: {
				type: Sequelize.STRING,
			  },
			  training_facility_location: {
				type: Sequelize.STRING,
			  },
			  training_organization_quality_certifications: {
				type: Sequelize.STRING,
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
				allowNull: true,
			  },
			  competence_line: {
				type: Sequelize.STRING,
				allowNull: true,
			  },
			  incidental_line: {
				type: Sequelize.STRING,
				allowNull: true,
			  },
			 
			  High_school: {
				type: Sequelize.JSONB,
				allowNull: true,
			  },
			  polytechnic: {
				type: Sequelize.JSONB,
				allowNull: true,
			  },
			  university: {
				type: Sequelize.JSONB,
				allowNull: true,
			  },
			  professional_qualification_institution: {
				type: Sequelize.STRING,
				allowNull: true,
			  },
			  date_of_issue: {
				type: Sequelize.DATE,
				allowNull: true,
			  },
			  professional_expiration_date: {
				type: Sequelize.DATE,
				allowNull: true,
			  },
			  experience_name_of_company: {
				type: Sequelize.STRING,
				allowNull: true,
			  },
			  company_declaration_date: {
				type: Sequelize.DATE,
				allowNull: true,
			  },
			  company_responsible_charge: {
				type: Sequelize.STRING,
				allowNull: true,
			  },
			  joining_date: {
				type: Sequelize.STRING,
				allowNull: true,
			  },
			  exit_date: {
				type: Sequelize.DATE,
				allowNull: true,
			  },
			  applicant_cv: {
				type: Sequelize.TEXT,
				allowNull: true,
			  },
			  higher_education_certificate: {
				type: Sequelize.TEXT,
				allowNull: true,
			  },
			  leia_experience: {
				type: Sequelize.TEXT,
				allowNull: true,
			  },
			  training_certificate: {
				type: Sequelize.TEXT,
				allowNull: true,
			  },
			 other_certificate: {
				type: Sequelize.TEXT,                                 
				allowNull: true,
			  },
			 employement_letter: {
				type: Sequelize.TEXT,
				allowNull: true,
			  },
			  is_draft: {
				type: Sequelize.BOOLEAN,                  
				defaultValue: false,
			  },
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
		await queryInterface.dropTable("CompetencyCertificationFormLiftOperator");
	},
};

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
			  user_id: {
				type: Sequelize.INTEGER,
				references: {
				  model: "users",
				  key: "id",
				},
				onDelete: "SET NULL",
				allowNull: true,
			  },
			  categoryId: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
				  model: "categories",
				  key: "id",
				},
				onDelete: "SET NULL",
			  },
			  subcategoryId: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
				  model: "subcategories",
				  key: "id",
				},
				onDelete: "SET NULL",
			  },
			  classificationId: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
				  model: "classifications",
				  key: "id",
				},
				onDelete: "SET NULL",
			  },
			  feeId: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
				  model: "fees",
				  key: "id",
				},
				onDelete: "SET NULL",
			  },
			  date_received: {
				type: Sequelize.DATE,
				allowNull: true,
			  },
			  paymentStatus: {
				type: Sequelize.ENUM("unpaid", "paid"),
				defaultValue: "unpaid",
			  },
			  appStatus: {
				type: Sequelize.ENUM("pending", "approved", "rejected", "suspended"),
				defaultValue: "pending",
			  },
			  form_number: {
				type: Sequelize.STRING,
				allowNull: true,
			  },
			  form_name: {
				type: Sequelize.STRING,
				allowNull: true,
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
				type: Sequelize.ENUM("Class 1","Class 2","Class 3"),
			},
			application_type: {
				type: Sequelize.ENUM("New Application", "Re-application"),
			},
			training_start_date: {
				type: Sequelize.DATE,
				allowNull:true
			},
			training_completion_date: {
				type: Sequelize.DATE,
				allowNull:true
			},
			documentation_available: {
				type: Sequelize.STRING,
				allowNull: true
			},
			exemption_requested: {
				type: Sequelize.STRING,
				allowNull: true
			},
			employer_name: {
				type: Sequelize.STRING,
				allowNull: true
			},
			employer_physical_address: {
				type: Sequelize.TEXT,
				allowNull: true
			},
			employer_authorization_number: {
				type: Sequelize.STRING,
				allowNull: true
			},
			employer_quality_certifications: {
				type: Sequelize.STRING,
				allowNull: true
			},
			employer_contact_person: {
				type: Sequelize.STRING,
				allowNull: true
			},
			employer_contact_telephone: {
				type: Sequelize.STRING,
				allowNull: true
			},
			employer_contact_email_address: {
				type: Sequelize.STRING,
				allowNull: true
			},
			training_organization_name: {
				type: Sequelize.STRING,
				allowNull: true
			},
			training_method: {
				type: Sequelize.ENUM("Online","Class Room","Field"),
				allowNull: true
			},
			training_organization_registration_number: {
				type: Sequelize.STRING,
				allowNull: true
			},
			training_facility_location: {
				type: Sequelize.STRING,
				allowNull: true
			},
			training_organization_quality_certifications: {
				type: Sequelize.STRING,
				allowNull: true
			},
			training_organization_contact_person: {
				type: Sequelize.STRING,
				allowNull: true
			},
			training_organization_telephone: {
				type: Sequelize.STRING,
				allowNull: true
			},
			training_organization_email: {
				type: Sequelize.STRING,
				allowNull: true
			},
			applicant_name: {
				type: Sequelize.STRING,
				allowNull: true
			},
			applicant_address: {
				type: Sequelize.TEXT,
				allowNull: true
			},
			applicant_date_of_birth: {
				type: Sequelize.DATE,
				allowNull: true
			},
			applicant_email_address: {
				type: Sequelize.STRING,
				allowNull: true
			},
			applicant_telephone_number: {
				type: Sequelize.STRING,
				allowNull: true
			},
			competence_category: {
				type: Sequelize.STRING,
				allowNull: true
			},
			competence_line_number: {
				type: Sequelize.STRING,
				allowNull: true
			},
			incidental_line_number: {
				type: Sequelize.STRING,
			},
			High_school: {
				type: Sequelize.JSONB,
				allowNull: true
			},
			polytechnic: {
				type: Sequelize.JSONB,
				allowNull: true
			},
			university: {
				type: Sequelize.JSONB,
				allowNull: true
			},
			professional_qualification_institution:{
				type:Sequelize.STRING,
				allowNull: true
			  } ,
					date_of_issue: {
				type:Sequelize.DATE,
				allowNull: true
			  },
			  expiry_date: {
				type:Sequelize.DATE,
				allowNull: true
			  },
					experience_name_of_company:{
				type:Sequelize.STRING,
				allowNull: true
			  },
					joining_date:{ 
				type:Sequelize.STRING,
				allowNull: true
			  },
					exit_date: {
				type:Sequelize.DATE,
				allowNull: true
			  },
			  companyQualityManual: {
				type: Sequelize.TEXT,
				allowNull: true
			  },
			applicant_declaration_name: {
				type: Sequelize.STRING,
				allowNull: true
			},
			applicant_declaration_date: {
				type: Sequelize.DATE,
				allowNull: true
			},
			employer_responsible_charge_name: {
				type: Sequelize.STRING,
				allowNull: true
			},
			employer_responsible_charge_date: {
				type: Sequelize.DATE,
				allowNull: true
			},
			director_of_factories: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			director_signature_date: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			applicant_cv: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			higher_education_certifications: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			training_certificate: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			employment_letter: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			is_draft: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			  },
			  remark: {
				type: Sequelize.TEXT,
				allowNull: true,
			  },
			  feedback: {
				type: Sequelize.TEXT,
				allowNull: true,
			  },
			  certificate: {
				type: Sequelize.JSONB,
				allowNull: true,
			  },
			  createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
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
		
		await queryInterface.sequelize.query('DROP TYPE "enum_CompetencyCertificationFormBoiler_application_type";');
	},
};
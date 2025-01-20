"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TrainingOrganizationForm", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
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
        allowNull: false,
        references: {
          model: "categories",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      subcategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "subcategories",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      classificationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "classifications",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      feeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
      form_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      boiler_pressure_categories: {
        type: Sequelize.ENUM(
					"Authorized Insepector",
					"Design Engineer",
					"Power Engineer",
					"Welding Engineer",
					"Refrigerator Engineer",
					"Boiler & Pressure Vessel Operator",
					"Pressure Welder",
					"Refrigeration Technician"),
      },
      lifting_equipment_category: {
        type: Sequelize.ENUM(
				"Approved Person",
				"Lift Technician",
				"Crane Operator",
				"Forklift Operator",
				"Work Equipment Operator",
				"Rigger",
				"Scaffolding Technician",
				"Abseiling Technician"
		),
      },
      application_type: {
        type: Sequelize.ENUM(
			"New Application",
			"Re-Application"
		),
      },
      available_for_documentation_review: {
        type: Sequelize.BOOLEAN,
      },
      exemption_request: {
        type: Sequelize.BOOLEAN,
      },
      company_name: {
        type: Sequelize.STRING,
      },
      cac_registration_number:{
        type:Sequelize.STRING,
      },
      physical_address: {
        type: Sequelize.TEXT,
      },
      year_of_commencing_business: {
        type: Sequelize.STRING,
      },
      number_of_employee: {
        type: Sequelize.INTEGER,
      },
      member_nagobin: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      member_leia: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      member_indt: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      member_other_bodies: {
        type: Sequelize.STRING,
      },
      quality_certification: {
        type: Sequelize.TEXT,
      },
      competence_category: {
        type: Sequelize.STRING,
      },
      competence_line: {
        type: Sequelize.STRING,
      },
      incidental_line: {
        type: Sequelize.STRING,
      },
      contact_person: {
        type: Sequelize.STRING,
      },
      telephone: {
        type: Sequelize.STRING,
      },
      email_address: {
        type: Sequelize.STRING,
      },
      technical_supervisor_name: {
        type: Sequelize.STRING,
      },
      technical_supervisor_address: {
        type: Sequelize.TEXT,
      },
      technical_supervisor_email: {
        type: Sequelize.STRING,
      },
      technical_supervisor_date_of_birth: {
        type: Sequelize.DATE,
      },
      technical_supervisor_phonenumber: {
        type: Sequelize.STRING,
      },
      High_school: {
        type: Sequelize.JSONB,
      },
      polytechnic: {
        type: Sequelize.JSONB,
      },
      university: {
        type: Sequelize.JSONB,
      },
      professional_qualification_institution:{
        type:Sequelize.STRING
      } ,
			date_of_issue: {
        type:Sequelize.DATE
      }
			,
			experience_name_of_company:{
        type:Sequelize.STRING,
      },
			joining_date:{ 
        type:Sequelize.STRING,
      },
			exit_date: {
        type:Sequelize.DATE,
      },
      companyQualityManual: {
        type: Sequelize.TEXT,
      },
      operationalProcedures: {
        type: Sequelize.TEXT,
      },
      companyDocumentation: {
        type: Sequelize.TEXT,
      },
      documentationQuality: {
        type: Sequelize.TEXT,
      },
      designerDocumentation: {
        type: Sequelize.TEXT,
      },
      weldingDocumentation: {
        type: Sequelize.TEXT,
      },
      ndtDocumentation: {
        type: Sequelize.TEXT,
      },
      indtDocumentation: {
        type: Sequelize.TEXT,
      },
      isoCertification: {
        type: Sequelize.TEXT,
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("TrainingOrganizationForm");
  },
};
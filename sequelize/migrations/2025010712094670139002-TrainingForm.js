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
      paymentStatus: {
        type: Sequelize.ENUM("unpaid", "paid"),
        defaultValue:"unpaid"
       
      },
      appStatus: {
        type: Sequelize.ENUM("pending", "approved", "rejected", "suspended"),
       defaultValue:"pending"
      },
      date_received: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      form_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      boilers_pressure_categories: {
        type: Sequelize.ENUM(
					"Authorized Inspector",
					"Design Engineer",
					"Power Engineer",
					"Welding Engineer",
					"Refrigerator Engineer",
					"Boiler & Pressure Vessel Operator", 
					"Pressure Welder",
					"Refrigeration Technician"),
          defaultValue:"Authorized Inspector",
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
    defaultValue:"Approved Person"
      },
      application_type: {
        type: Sequelize.ENUM(
			"New Application",
			"Re-Application"
		),
    defaultValue:"New Application"
      },
      available_for_documentation_review: {
        type: Sequelize.BOOLEAN,
        allowNull:"true"
      },
      exemption_request: {
        type: Sequelize.BOOLEAN,
        allowNull:"true"
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
        allowNull: true,
      },
      quality_certification: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      competence_category: {
        type: Sequelize.STRING,
        allowNull:true
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
        allowNull:true
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
        type:Sequelize.DATE,
        allowNull:true
      }
			,
      professional_expiration_date:{
        type:Sequelize.DATE,
        allowNull:true
      },
			experience_name_of_company:{
        type:Sequelize.STRING,
        allowNull:true
      },
      company_declaration_date:{
        type:Sequelize.DATE,
        allowNull:true
      },
      company_responsible_charge:{
        type:Sequelize.STRING,
      },
			joining_date:{ 
        type:Sequelize.STRING,
      },
			exit_date: {
        type:Sequelize.DATE,
        allowNull:true
      },
      companyQualityManual: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      operationalProcedures: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      companyDocumentation: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      documentationQuality: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      designerDocumentation: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      weldingDocumentation: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      ndtDocumentation: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      indtDocumentation: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      isoCertification: {
        type: Sequelize.TEXT,
        allowNull:true
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
    certificate:{
      type: Sequelize.JSONB,
      allowNull: true,
    }
    });
    
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("TrainingOrganizationForm");
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_TrainingOrganizationForm_boiler_pressure_categories";');
  },
};
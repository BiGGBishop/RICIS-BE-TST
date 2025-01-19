"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("AuthorizedInspectorCertifications", {
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
      certification_type: {
        type: Sequelize.ENUM("Non-Nuclear", "Nuclear"),
        allowNull: false,
      },
      certification_class: {
        type: Sequelize.ENUM("Class 1", "Class 2", "Class 3"),
        allowNull: false,
      },
      endorsement: {
        type: Sequelize.ENUM("R", "N"),
        allowNull: true,
      },
      application_type: {
        type: Sequelize.ENUM("New Application", "Re-application"),
        allowNull: false,
      },
      training_start_date: {
        type: Sequelize.DATE,
      },
      training_completion_date: {
        type: Sequelize.DATE,
      },
      documentation_available: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      exemption_requested: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
      },
      competence_line_number: {
        type: Sequelize.STRING,
      },
      incidental_line_number: {
        type: Sequelize.STRING,
      },
      high_school: {
        type: Sequelize.JSONB,
        allowNull:true
      },
      polytechnic: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      university: {
        type: Sequelize.JSONB,
        allowNull:true
      },
      professional_qualification_institution:{
        type:Sequelize.STRING,
        allowNull:true

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
      director_of_factories: {
        type: Sequelize.STRING,
      },
      director_signature_date: {
        type: Sequelize.DATE,
      },
      applicant_cv: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      higher_education_certifications: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      nagobin_experience_certificate: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      training_certificate: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      other_certifications: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      employment_letter: {
        type: Sequelize.TEXT,
        allowNull: true,
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
    await queryInterface.dropTable("AuthorizedInspectorCertifications");
  },
};
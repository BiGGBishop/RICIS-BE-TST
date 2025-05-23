"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("CompetencyCertificationWelders", {
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
      form_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      class_of_certification: {
        type: Sequelize.ENUM("Class MW", "Class SW"),
      },
      application_type: {
        type: Sequelize.ENUM("New Application", "Re-Application"),
      },
      training_start_date: {
        type: Sequelize.DATE,
      },
      training_completion_date: {
        type: Sequelize.DATE,
      },
      documentation_available: {
        type: Sequelize.STRING,
        defaultValue: true,
      },
      exemption_requested: {
        type: Sequelize.STRING,
        defaultValue: true,
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
        type: Sequelize.ENUM("Online", "Class Room", "Field/Workshop"),
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
      High_school: {
        type: Sequelize.JSONB,
      },
      polytechnic: {
        type: Sequelize.JSONB,
      },
      university: {
        type: Sequelize.JSONB,
      },
      professional_qualification_institution: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      date_of_issue: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      expiry_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      experience_name_of_company: {
        type: Sequelize.STRING,
      },
      joining_date: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      exit_date: {
        type: Sequelize.DATE,
        allowNull: true,
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
      applicant_cv: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      higher_education_certifications: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      other_certificate: {
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
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("CompetencyCertificationWelders");
  },
};
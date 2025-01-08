'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("RenewalForms", {
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
      date_received: Sequelize.DATE,
      form_number: Sequelize.STRING,
      form_type: Sequelize.STRING,

      // Service Classification
      equipment_registration: Sequelize.BOOLEAN,
      certificate_of_competence: Sequelize.BOOLEAN,
      certificate_of_authorization: Sequelize.BOOLEAN,

      // Document Check
      documentation_available: Sequelize.BOOLEAN,
      exemption_requested: Sequelize.BOOLEAN,

      // Company Information
      company_name: Sequelize.STRING,
      company_address: Sequelize.TEXT,
      company_cac_registration_number: Sequelize.STRING,
      year_of_commencement: Sequelize.INTEGER,
      number_of_employees: Sequelize.INTEGER,
      nagobin_membership: Sequelize.BOOLEAN,
      leia_membership: Sequelize.BOOLEAN,
      other_memberships: Sequelize.ARRAY(Sequelize.STRING),
      quality_certifications: Sequelize.ARRAY(Sequelize.STRING),
      previous_authorization_certificate_number: Sequelize.STRING,
      previous_authorization_date_of_issue: Sequelize.DATE,
      previous_authorization_expiry_date: Sequelize.DATE,
      renewal_reason: Sequelize.TEXT,

      // Competence Details
      competence_category: Sequelize.STRING,
      competence_line_number: Sequelize.STRING,
      incidental_line_number: Sequelize.STRING,
      contact_person_name: Sequelize.STRING,
      contact_person_email: Sequelize.STRING,
      contact_person_phone: Sequelize.STRING,

      // Declaration
      responsible_charge_name: Sequelize.STRING,
      declaration_date: Sequelize.DATE,

      // Official Use
      approval_category: Sequelize.STRING,
      approval_class: Sequelize.STRING,
      contractor_number: Sequelize.STRING,
      director_of_factories: Sequelize.STRING,
      director_signature_date: Sequelize.DATE,

      // Uploaded Documents
      uploaded_documents: Sequelize.ARRAY(Sequelize.STRING),

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
    await queryInterface.dropTable("RenewalForms");
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
        await queryInterface.createTable('ManufacturerRepairers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // References the users table
          key: 'id',
        },
        onDelete: 'SET NULL',
        allowNull: true,
      },
      date_received: {
        type: Sequelize.DATE,
      },
      form_number: {
        type: Sequelize.STRING,
      },
      certification_type: {
        type: Sequelize.ENUM('Boiler & Pressure Vessel', 'Lifting Equipment'),
      },
      service_classification: {
        type: Sequelize.ENUM(
          'Class A',
          'Class B',
          'Class C',
          'Class D',
          'Class E',
          'Class F',
          'Class G'
        ),
      },
      application_type: {
        type: Sequelize.ENUM('New Application', 'Re-Application'),
      },
      documentation_available: {
        type: Sequelize.BOOLEAN,
      },
      exemption_requested: {
        type: Sequelize.BOOLEAN,
      },
      form_type: {
        type: Sequelize.STRING,
      },
      company_name: {
        type: Sequelize.STRING,
      },
      company_address: {
        type: Sequelize.TEXT,
      },
      company_cac_registration_number: {
        type: Sequelize.STRING,
      },
      year_of_commencement: {
        type: Sequelize.INTEGER,
      },
      number_of_employees: {
        type: Sequelize.INTEGER,
      },
      nagobin_membership: {
        type: Sequelize.BOOLEAN,
      },
      leia_membership: {
        type: Sequelize.BOOLEAN,
      },
      indt_membership: {
        type: Sequelize.BOOLEAN,
      },
      other_memberships: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      quality_certifications: {
        type: Sequelize.ARRAY(Sequelize.STRING),
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
      contact_person_name: {
        type: Sequelize.STRING,
      },
      contact_person_email: {
        type: Sequelize.STRING,
      },
      contact_person_phone: {
        type: Sequelize.STRING,
      },
      quality_manager_name: {
        type: Sequelize.STRING,
      },
      quality_manager_address: {
        type: Sequelize.TEXT,
      },
      quality_manager_date_of_birth: {
        type: Sequelize.DATE,
      },
      quality_manager_email: {
        type: Sequelize.STRING,
      },
      quality_manager_phone: {
        type: Sequelize.STRING,
      },
      education_details: {
        type: Sequelize.ARRAY(Sequelize.JSONB),
      },
      professional_qualifications: {
        type: Sequelize.ARRAY(Sequelize.JSONB),
      },
      experience_details: {
        type: Sequelize.ARRAY(Sequelize.JSONB),
      },
      responsible_charge_name: {
        type: Sequelize.STRING,
      },
      declaration_date: {
        type: Sequelize.DATE,
      },
      approval_category: {
        type: Sequelize.STRING,
      },
      approval_class: {
        type: Sequelize.STRING,
      },
      contractor_number: {
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
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ManufacturerRepairers');
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('boiler_registrations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'SET NULL',
        allowNull: true,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      subcategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'subcategories',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      classificationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'classifications',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      feeId: {
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
        allowNull: true,
      },
      form_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      type_of_installation: {
        type: Sequelize.ENUM('Boiler', 'Pressure Vessel', 'Heating', 'Other'),
      },
      installation_dates: {
        type: Sequelize.JSON,
      },
      installation_type: {
        type: Sequelize.ENUM('New Installation', 'Existing Installation'),
      },
      form_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      data_reports_available: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      variance_requested: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      installer_name: {
        type: Sequelize.STRING,
      },
      installer_address: {
        type: Sequelize.TEXT,
      },
      installer_authorization_number: {
        type: Sequelize.STRING,
      },
      installer_quality_certifications: {
        type: Sequelize.STRING,
      },
      installer_contact_person: {
        type: Sequelize.STRING,
      },
      installer_contact_telephone: {
        type: Sequelize.STRING,
      },
      installer_contact_email: {
        type: Sequelize.STRING,
      },
      owner_name: {
        type: Sequelize.STRING,
      },
      manufacturing_process: {
        type: Sequelize.STRING,
      },
      factory_registration_number: {
        type: Sequelize.STRING,
      },
      owner_location: {
        type: Sequelize.TEXT,
      },
      owner_quality_certifications: {
        type: Sequelize.STRING,
      },
      owner_contact_person: {
        type: Sequelize.STRING,
      },
      owner_contact_telephone: {
        type: Sequelize.STRING,
      },
      owner_contact_email: {
        type: Sequelize.STRING,
      },
      manufacturer: {
        type: Sequelize.STRING,
      },
      manufacture_year: {
        type: Sequelize.DATE,
      },
      place_of_manufacture: {
        type: Sequelize.STRING,
      },
      code_of_construction: {
        type: Sequelize.STRING,
      },
      intended_use: {
        type: Sequelize.STRING,
      },
      inspection_agency: {
        type: Sequelize.STRING,
      },
      inspection_authorization_number: {
        type: Sequelize.STRING,
      },
      hydro_test_date: {
        type: Sequelize.DATE,
      },
      hydro_test_pressure: {
        type: Sequelize.STRING,
      },
      design_pressure: {
        type: Sequelize.STRING,
      },
      mawp_mdmt: {
        type: Sequelize.STRING,
      },
      equipment_type: {
        type: Sequelize.STRING,
      },
      equipment_distinctive_number: {
        type: Sequelize.STRING,
      },
      operating_medium: {
        type: Sequelize.STRING,
      },
      equipment_category: {
        type: Sequelize.STRING,
      },
      equipment_sub_category: {
        type: Sequelize.STRING,
      },
      equipment_classification: {
        type: Sequelize.STRING,
      },
      equipment_line_number: {
        type: Sequelize.STRING,
      },
      equipment_incidental_number: {
        type: Sequelize.STRING,
      },
      manufacturers_data_report: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      construction_drawings: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      design_calculation: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      test_parameters_data: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      accreditation_documents: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      installation_plan: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      quality_assurance_program: {
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
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('boiler_registrations');
  },
};
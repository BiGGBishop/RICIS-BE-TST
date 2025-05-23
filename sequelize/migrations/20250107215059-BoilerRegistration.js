'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('boiler_registrations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'SET NULL',
        allowNull: true
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'categories',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      subcategoryId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'subcategories',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      classificationId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'classifications',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      feeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'fees',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      date_received: {
        type: Sequelize.DATE,
        allowNull: true
      },
      paymentStatus: {
        type: Sequelize.ENUM("unpaid", "paid"),
        defaultValue: "unpaid"
      },
      appStatus: {
        type: Sequelize.ENUM("pending", "approved", "rejected", "suspended"),
        defaultValue: "pending"
      },
      form_number: {
        type: Sequelize.STRING,
        allowNull: true
      },
      form_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      type_of_installation: {
        type: Sequelize.ENUM("Boiler", "Pressure Vessel", "Heating", "Other"),
        allowNull: true
      },
      installation_type: {
        type: Sequelize.ENUM("New Installation", "Existing Installation"),
        allowNull: true
      },
      form_type: {
        type: Sequelize.STRING,
        allowNull: true
      },
      data_reports_available: {
        type: Sequelize.STRING,
        allowNull: true
      },
      variance_requested: {
        type: Sequelize.STRING,
        allowNull: true
      },
      installer_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      installer_address: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      installer_authorization_number: {
        type: Sequelize.STRING,
        allowNull: true
      },
      installer_quality_certifications: {
        type: Sequelize.STRING,
        allowNull: true
      },
      installer_contact_person: {
        type: Sequelize.STRING,
        allowNull: true
      },
      installer_contact_telephone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      installer_contact_email: {
        type: Sequelize.STRING,
        allowNull: true
      },
      owner_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      manufacturing_process: {
        type: Sequelize.STRING,
        allowNull: true
      },
      factory_registration_number: {
        type: Sequelize.STRING,
        allowNull: true
      },
      owner_location: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      owner_quality_certifications: {
        type: Sequelize.STRING,
        allowNull: true
      },
      owner_contact_person: {
        type: Sequelize.STRING,
        allowNull: true
      },
      owner_contact_telephone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      owner_contact_email: {
        type: Sequelize.STRING,
        allowNull: true
      },
      manufacturer: {
        type: Sequelize.STRING,
        allowNull: true
      },
      manufacture_year: {
        type: Sequelize.DATE,
        allowNull: true
      },
      place_of_manufacture: {
        type: Sequelize.STRING,
        allowNull: true
      },
      code_of_construction: {
        type: Sequelize.STRING,
        allowNull: true
      },
      intended_use: {
        type: Sequelize.STRING,
        allowNull: true
      },
      inspection_agency: {
        type: Sequelize.STRING,
        allowNull: true
      },
      inspection_authorization_number: {
        type: Sequelize.STRING,
        allowNull: true
      },
      hydro_test_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      hydro_test_pressure: {
        type: Sequelize.STRING,
        allowNull: true
      },
      design_pressure: {
        type: Sequelize.STRING,
        allowNull: true
      },
      mawp_mdmt: {
        type: Sequelize.STRING,
        allowNull: true
      },
      equipment_type: {
        type: Sequelize.STRING,
        allowNull: true
      },
      equipment_distinctive_number: {
        type: Sequelize.STRING,
        allowNull: true
      },
      operating_medium: {
        type: Sequelize.STRING,
        allowNull: true
      },
      equipment_category: {
        type: Sequelize.STRING,
        allowNull: true
      },
      equipment_sub_category: {
        type: Sequelize.STRING,
        allowNull: true
      },
      equipment_classification: {
        type: Sequelize.STRING,
        allowNull: true
      },
      equipment_line_number: {
        type: Sequelize.STRING,
        allowNull: true
      },
      equipment_incidental_number: {
        type: Sequelize.STRING,
        allowNull: true
      },
      manufacturers_data_report: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      construction_drawings: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      design_calculation: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      test_parameters_data: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      accreditation_documents: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      installation_plan: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      quality_assurance_program: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      is_draft: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      remark: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      feedback: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      certificate: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('boiler_registrations');
  }
};
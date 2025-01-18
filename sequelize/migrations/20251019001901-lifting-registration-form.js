"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("LiftingEquipmentRegistrations", {
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
      // Application Details
      categoryId:{
				type: Sequelize.INTEGER,
				allowNull: false, 
				references: {
				  model: 'categories',
				  key: 'id',
				},
				onDelete: 'SET NULL',	
			},
			subcategoryId:{
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'subcategories',
					key: 'id',
				},
				onDelete: 'SET NULL',
				
			},
			classificationId:{
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
				  model: 'classifications',
				  key: 'id',
				},
				onDelete: 'SET NULL',
			},
			feeId:{
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'fees',
					key: 'id',
				},
				onDelete: 'SET NULL',
			},
            date_received: {
              type:  Sequelize.DATE,
              allowNull: true
            },
			form_number:{
				type: Sequelize.STRING,
				allowNull: true,
			} ,
      type_of_installation: {
        type: Sequelize.ENUM("Lifts", "Escalator", "Hoist"),
      },
      type_of_facility: Sequelize.STRING,
      object_use: {
        type: Sequelize.ENUM("Personnel", "Material", "Other"),
      },
      object_use_other: Sequelize.STRING,
      installation_type: {
        type: Sequelize.ENUM("New Installation", "Existing Installation"),
      },
      installation_start_date: Sequelize.DATE,
      installation_completion_date: Sequelize.DATE,
      data_reports_available: Sequelize.BOOLEAN,
      variance_requested: Sequelize.BOOLEAN,

      // Company Performing Installation
      installer_name: Sequelize.STRING,
      installer_address: Sequelize.TEXT,
      installer_authorization_number: Sequelize.STRING,
      installer_quality_certifications: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      installer_contact_person: Sequelize.STRING,
      installer_contact_telephone: Sequelize.STRING,
      installer_contact_email: Sequelize.STRING,

      // Lifting Equipment Owner Information
      owner_name: Sequelize.STRING,
      nature_of_facility: Sequelize.STRING,
      factory_registration_number: Sequelize.STRING,
      owner_location: Sequelize.TEXT,
      owner_quality_certifications: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      owner_contact_person: Sequelize.STRING,
      owner_contact_telephone: Sequelize.STRING,
      owner_contact_email: Sequelize.STRING,

      // Equipment Information
      manufacturer: Sequelize.STRING,
      manufacture_year_and_place: Sequelize.STRING,
      code_of_construction: Sequelize.STRING,
      intended_use: Sequelize.STRING,
      equipment_condition: {
        type: Sequelize.ENUM("New", "Used"),
      },
      inspection_agency: Sequelize.STRING,
      inspection_authorization_number: Sequelize.STRING,
      date_of_test: Sequelize.DATE,
      tested_capacity: Sequelize.STRING,
      design_capacity: Sequelize.STRING,
      swl: Sequelize.STRING,
      equipment_type: Sequelize.STRING,
      equipment_distinctive_number: Sequelize.STRING,
      operating_environment: Sequelize.STRING,
      equipment_category: Sequelize.STRING,
      equipment_sub_category: Sequelize.STRING,
      equipment_classification: Sequelize.STRING,
      equipment_line_number: Sequelize.STRING,
      equipment_incidental_number: Sequelize.STRING,
      equipment_owner: Sequelize.STRING,

      // Declaration
      responsible_charge_name: Sequelize.STRING,
      declaration_date: Sequelize.DATE,

      // Official Use
      application_category: Sequelize.STRING,
      registered_number: Sequelize.STRING,
      director_of_factories: Sequelize.STRING,
      director_signature_date: Sequelize.DATE,

      // Uploaded Documents
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
      is_draft: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("LiftingEquipmentRegistrations");
  },
};
"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("applications", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      save_as_draft: Sequelize.BOOLEAN,

      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users", //naame of the users table
          key: "id",
        },
        allowNull: true,
        onDelete: "SET NULL",
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "categories", //naame of the category table
          key: "id",
        },
        allowNull: true,
        onDelete: "SET NULL",
      },
      subcategoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "subcategories", // naame of the subcategory table
          key: "id",
        },
        allowNull: true,
        onDelete: "SET NULL",
      },
      classificationId: {
        type: Sequelize.INTEGER,
        references: {
          model: "classifications", // naame of the classification table
          key: "id",
        },
        allowNull: true,
        onDelete: "SET NULL",
      },
      payment_status: {
        type: Sequelize.ENUM("unpaid", "paid"), // Define ENUM with the possible values
        allowNull: true, // You can also make it required by using allowNull: false
        defaultValue: "unpaid", // Set the default value
      },
      app_status: {
        type: Sequelize.ENUM("pending", "approved", "rejected", "suspended"), // Define ENUM with the possible values
        allowNull: true, // You can also make it required by using allowNull: false
        defaultValue: "pending", // Set the default value
      },
      paymentId: {
        type: Sequelize.INTEGER,
      },
      equipment_incidental: {
        type: Sequelize.STRING,
      },


      company_name: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      company_type: {
        type: Sequelize.STRING,
      },
      company_tin: {
        type: Sequelize.STRING,
      },
      company_rc_number: {
        type: Sequelize.STRING,
      },
      company_phone: {
        type: Sequelize.INTEGER,
      },
      representative_name: {
        type: Sequelize.STRING,
      },
      representative_phone: {
        type: Sequelize.INTEGER,
      },
      comapany_address: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      website: {
        type: Sequelize.STRING,
      },
      phone_number: {
        type: Sequelize.INTEGER,
      },
      equipment_name: {
        type: Sequelize.STRING,
      },
      equipment_owner: {
        type: Sequelize.STRING,
      },

      type_of_facility: {
        type: Sequelize.STRING,
      },
      construction_code: {
        type: Sequelize.STRING,
      },
      year_of_manufacturer: {
        type: Sequelize.DATE,
      },
      place_of_manufacture: {
        type: Sequelize.STRING,
      },
      hydro_test_pressure: {
        type: Sequelize.STRING,
      },
      date_of_hydro_test: {
        type: Sequelize.STRING,
      },
      inspection_agency: {
        type: Sequelize.STRING,
      },
      aia_authorization: {
        type: Sequelize.STRING,
      },
      equipment_distinctive: {
        type: Sequelize.STRING,
      },
      equipment_type: {
        type: Sequelize.STRING,
      },
      mawp_or_mdmt: {
        type: Sequelize.STRING,
      },
      equipment_category: {
        type: Sequelize.STRING,
      },
      design_presure: {
        type: Sequelize.STRING,
      },
      operating_medium: {
        type: Sequelize.STRING,
      },
      equipment_line: {
        type: Sequelize.INTEGER,
      },
      equipment_classification: {
        type: Sequelize.STRING,
      },
      equipment_sub_category: {
        type: Sequelize.STRING,
      },
      manufacturer: {
        type: Sequelize.STRING,
      },
      new_or_used: {
        type: Sequelize.STRING,
      },
      intended_use_of_equipment: {
        type: Sequelize.STRING,
      },
      object_use: {
        type: Sequelize.STRING,
      },
      installation_start_date: {
        type: Sequelize.DATE,
      },
      installation_complete_date: {
        type: Sequelize.DATE,
      },
      installer_name: {
        type: Sequelize.STRING,
      },
      installer_physical_address: {
        type: Sequelize.STRING,
      },
      quality_cert_of_installer_comppany: {
        type: Sequelize.STRING,
      },
      installer_authorization: {
        type: Sequelize.STRING,
      },
      installer_contact_person: {
        type: Sequelize.STRING,
      },
      installer_telephone: {
        type: Sequelize.INTEGER,
      },
      installer_email: {
        type: Sequelize.STRING,
      },
      name_of_occupier_or_owner: {
        type: Sequelize.STRING,
      },
      nature_of_manufacturing_process: {
        type: Sequelize.STRING,
      },
      owner_factory_reg: {
        type: Sequelize.STRING,
      },
      owner_quality_cert_of_company: {
        type: Sequelize.STRING,
      },
      owner_email: {
        type: Sequelize.STRING,
      },
      owner_telephone: {
        type: Sequelize.INTEGER,
      },
      contact_person: {
        type: Sequelize.INTEGER,
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
  async down(queryInterface) {
    await queryInterface.dropTable("applications");
  },
};

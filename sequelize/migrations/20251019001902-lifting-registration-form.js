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
        allowNull: true,
        references: {
          model: "categories",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      subcategoryId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "subcategories",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      classificationId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "classifications",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      feeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
      form_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      form_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      type_of_installation: {
        type: Sequelize.ENUM("Lifts", "Escalator", "Hoist"),
        allowNull: true,
      },
      type_of_facility: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      object_use: {
        type: Sequelize.ENUM("Personnel", "Material", "Other"),
        allowNull: true,
      },
      installation_type: {
        type: Sequelize.ENUM("New Installation", "Existing Installation"),
        allowNull: true,
      },
      installation_start_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      installation_completion_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      data_reports_available: {
        type: Sequelize.STRING,
        defaultValue: false,
        allowNull: true,
      },
      variance_requested: {
        type: Sequelize.STRING,
        defaultValue: false,
        allowNull: true,
      },
      installer_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      installer_address: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      installer_authorization_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      installer_quality_certifications: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      installer_contact_person: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      installer_contact_telephone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      installer_contact_email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      owner_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nature_of_manufacturing: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      factory_registration_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      location_of_facility: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      owner_quality_certifications: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      owner_contact_person: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      owner_contact_telephone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      owner_contact_email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      manufacturer: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      manufacture_year_and_place: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      code_of_construction: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      intended_use: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      equipment_condition: {
        type: Sequelize.ENUM("New", "Used"),
        allowNull: true,
      },
      inspection_agency: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      inspection_authorization_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      date_of_test: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      tested_capacity: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      design_capacity: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      swl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      equipment_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      equipment_distinctive_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      operating_environment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      equipment_category: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      equipment_sub_category: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      equipment_classification: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      equipment_line_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      equipment_incidental_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      equipment_owner: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      company_responsible_charge: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      declaration_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      manufacturers_report_certificate: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      construction_drawings_lifting_equipment: {
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
      accreditation_documents_manufacturer: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      installation: {
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("LiftingEquipmentRegistrations");
  },
};
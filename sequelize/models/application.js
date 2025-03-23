"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Application belongs to a category
      Application.belongsTo(models.Categories, {
        foreignKey: "categoryId",
        as: "category", // alias
      });

      // Application belongs to a subcategory
      Application.belongsTo(models.SubCategories, {
        foreignKey: "subcategoryId",
        as: "subcategory", // Alias
      });

      Application.belongsTo(models.User, {
        foreignKey: "userId", // This will create the foreign key in the 'User' table
        as: "user", // Alias for the association
      });

      Application.hasMany(models.Conversation, {
        foreignKey: "applicationId",
        as: "conversations",
      });

      Application.belongsTo(models.Classification, {
        foreignKey: "classificationId", // This will create the foreign key in the 'User' table
        as: "classification", // Alias for the association
      });
      
    }
  }
  Application.init(
    {
      save_as_draft: DataTypes.BOOLEAN,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users", // Name of the users table
          key: "id",
        },
        onDelete: "SET NULL", // What to do if the referenced users is deleted
        allowNull: true,
      },

      application_category: DataTypes.STRING,
      application_type: DataTypes.STRING,
      

      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: "categories", // Name of the categories table
          key: "id",
        },
        onDelete: "SET NULL", // What to do if the referenced categories is deleted
        allowNull: true,
      },

      subcategoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: "subcategories", // Name of the categories table
          key: "id",
        },
        onDelete: "SET NULL", // What to do if the referenced categories is deleted
        allowNull: true,
      },
      classificationId: {
        type: DataTypes.INTEGER,
        references: {
          model: "classifications", // naame of the classification table
          key: "id",
        },
        allowNull: true,
        onDelete: "SET NULL",
      },
      payment_status: {
        type: DataTypes.ENUM("unpaid", "paid"), // Define ENUM with the possible values
        allowNull: true, // You can also make it required by using allowNull: false
        defaultValue: "unpaid", // Set the default value
      },
      app_status: {
        type: DataTypes.ENUM("pending", "approved", "rejected", "suspended"), // Define ENUM with the possible values
        allowNull: true, // You can also make it required by using allowNull: false
        defaultValue: "pending", // Set the default value
      },
      paymentId: DataTypes.INTEGER,
      equipment_incidental: DataTypes.STRING,
      company_name: DataTypes.STRING,
      name: DataTypes.STRING,
      company_type: DataTypes.STRING,
      company_tin: DataTypes.STRING,
      company_rc_number: DataTypes.STRING,
      company_phone: DataTypes.STRING,
      representative_name: DataTypes.STRING,
      representative_phone: DataTypes.STRING,
      comapany_address: DataTypes.STRING,
      address: DataTypes.STRING,
      email: DataTypes.STRING,
      website: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      equipment_name: DataTypes.STRING,
      equipment_owner: DataTypes.STRING,
      type_of_facility: DataTypes.STRING,
      construction_code: DataTypes.STRING,
      year_of_manufacture: DataTypes.DATE,
      place_of_manufacture: DataTypes.STRING,
      hydro_test_pressure: DataTypes.STRING,
      date_of_hydro_test: DataTypes.STRING,
      inspection_agency: DataTypes.STRING,
      aia_authorization: DataTypes.STRING,
      equipment_distinctive: DataTypes.STRING,
      equipment_type: DataTypes.STRING,
      mawp_or_mdmt: DataTypes.STRING,
      equipment_category: DataTypes.STRING,
      design_presure: DataTypes.STRING,
      operating_medium: DataTypes.STRING,
      equipment_line: DataTypes.STRING,
      equipment_classification: DataTypes.STRING,
      equipment_sub_category: DataTypes.STRING,
      manufacturer: DataTypes.STRING,
      new_or_used: DataTypes.STRING,
      intended_use_of_equipment: DataTypes.STRING,
      object_use: DataTypes.STRING,
      installation_start_date: DataTypes.DATE,
      installation_complete_date: DataTypes.DATE,
      installer_name: DataTypes.STRING,
      installer_physical_address: DataTypes.STRING,
      quality_cert_of_installer_comppany: DataTypes.STRING,
      installer_authorization: DataTypes.STRING,
      installer_contact_person: DataTypes.STRING,
      installer_telephone: DataTypes.STRING,
      installer_email: DataTypes.STRING,
      name_of_occupier_or_owner: DataTypes.STRING,
      nature_of_manufacturing_process: DataTypes.STRING,
      owner_factory_reg: DataTypes.STRING,
      owner_quality_cert_of_company: DataTypes.STRING,
      owner_email: DataTypes.STRING,
      owner_telephone: DataTypes.STRING,
      contact_person: DataTypes.INTEGER,
      feeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Application",
      tableName: "applications",
    }
  );
  return Application;
};
